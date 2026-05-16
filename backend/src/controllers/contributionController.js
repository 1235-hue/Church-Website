// Contributions controller — admin sees all; user sees only their own.
const db = require('../config/db');

async function listContributions(req, res, next) {
  try {
    // Admins / staff see everything; regular users only their own rows.
    const isAdmin = req.user && (req.user.role === 'admin' || req.user.role === 'staff');
    let rows;
    if (isAdmin) {
      ({ rows } = await db.query(
        `SELECT id, contributor, amount, method, note, contributed_at, item_id, phone, user_id
         FROM contributions ORDER BY contributed_at DESC LIMIT 500`
      ));
    } else if (req.user) {
      ({ rows } = await db.query(
        `SELECT id, contributor, amount, method, note, contributed_at, item_id, phone, user_id
         FROM contributions WHERE user_id = $1 ORDER BY contributed_at DESC`,
        [req.user.id]
      ));
    } else {
      return res.status(401).json({ error: 'Login required' });
    }
    res.json(rows);
  } catch (e) { next(e); }
}

async function summary(req, res, next) {
  try {
    const goalQ = db.query('SELECT * FROM fundraiser_goal WHERE id = 1');
    const sumQ  = db.query(
      'SELECT COALESCE(SUM(amount),0)::numeric AS total, COUNT(*)::int AS count FROM contributions'
    );
    const [goalR, sumR] = await Promise.all([goalQ, sumQ]);
    const goal = goalR.rows[0] || null;
    const total = Number(sumR.rows[0].total);
    const count = sumR.rows[0].count;
    const percent = goal && Number(goal.goal_amount) > 0
      ? Math.min(100, (total / Number(goal.goal_amount)) * 100)
      : 0;
    res.json({ goal, total, count, percent });
  } catch (e) { next(e); }
}

async function createContribution(req, res, next) {
  try {
    const { contributor, amount, method = 'cash', note, item_id, phone, user_id } = req.body;
    const { rows } = await db.query(
      `INSERT INTO contributions (contributor, amount, method, note, recorded_by, item_id, phone, user_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [contributor, amount, method, note || null, req.user?.id || null,
       item_id || null, phone || null, user_id || null]
    );
    // Bump item.raised if linked
    if (item_id) {
      await db.query('UPDATE items SET raised = raised + $1 WHERE id = $2', [amount, item_id]);
    }
    res.status(201).json(rows[0]);
  } catch (e) { next(e); }
}

async function deleteContribution(req, res, next) {
  try {
    await db.query('DELETE FROM contributions WHERE id = $1', [req.params.id]);
    res.status(204).end();
  } catch (e) { next(e); }
}

async function updateGoal(req, res, next) {
  try {
    const { title, goal_amount, currency, event_date } = req.body;
    const { rows } = await db.query(
      `INSERT INTO fundraiser_goal (id, title, goal_amount, currency, event_date)
       VALUES (1,$1,$2,$3,$4)
       ON CONFLICT (id) DO UPDATE SET
         title=EXCLUDED.title, goal_amount=EXCLUDED.goal_amount,
         currency=EXCLUDED.currency, event_date=EXCLUDED.event_date
       RETURNING *`,
      [title, goal_amount, currency || 'KES', event_date]
    );
    res.json(rows[0]);
  } catch (e) { next(e); }
}

module.exports = {
  listContributions, summary, createContribution, deleteContribution, updateGoal,
};
