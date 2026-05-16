// RSVP / attendance controller
const db = require('../config/db');

async function create(req, res, next) {
  try {
    const { full_name, email, phone, guests = 1, message } = req.body;
    const { rows } = await db.query(
      `INSERT INTO rsvps (full_name, email, phone, guests, message)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (email) DO UPDATE SET
         full_name = EXCLUDED.full_name,
         phone     = EXCLUDED.phone,
         guests    = EXCLUDED.guests,
         message   = EXCLUDED.message
       RETURNING *`,
      [full_name, email.toLowerCase(), phone || null, guests, message || null]
    );
    res.status(201).json(rows[0]);
  } catch (e) { next(e); }
}

async function list(req, res, next) {
  try {
    const { rows } = await db.query('SELECT * FROM rsvps ORDER BY created_at DESC');
    res.json(rows);
  } catch (e) { next(e); }
}

async function stats(req, res, next) {
  try {
    const { rows } = await db.query(
      'SELECT COUNT(*)::int AS rsvps, COALESCE(SUM(guests),0)::int AS total_guests FROM rsvps'
    );
    res.json(rows[0]);
  } catch (e) { next(e); }
}

async function remove(req, res, next) {
  try {
    await db.query('DELETE FROM rsvps WHERE id = $1', [req.params.id]);
    res.status(204).end();
  } catch (e) { next(e); }
}


async function mine(req, res, next) {
  try {
    const email = req.user?.email;
    if (!email) return res.status(401).json({ error: 'Login required' });
    const { rows } = await db.query('SELECT * FROM rsvps WHERE email = $1', [String(email).toLowerCase()]);
    if (!rows[0]) return res.status(404).json({ error: 'No RSVP' });
    res.json(rows[0]);
  } catch (e) { next(e); }
}

module.exports = { create, list, stats, remove, mine };
