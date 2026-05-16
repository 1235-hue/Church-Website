// Items / instruments controller
const db = require('../config/db');

async function list(req, res, next) {
  try {
    const { rows } = await db.query(
      'SELECT * FROM items ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (e) { next(e); }
}

async function getOne(req, res, next) {
  try {
    const { rows } = await db.query('SELECT * FROM items WHERE id = $1', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Item not found' });
    res.json(rows[0]);
  } catch (e) { next(e); }
}

async function create(req, res, next) {
  try {
    const { name, description, image_url, target_cost, raised = 0, status = 'pending' } = req.body;
    const { rows } = await db.query(
      `INSERT INTO items (name, description, image_url, target_cost, raised, status)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [name, description || null, image_url || null, target_cost, raised, status]
    );
    res.status(201).json(rows[0]);
  } catch (e) { next(e); }
}

async function update(req, res, next) {
  try {
    const { name, description, image_url, target_cost, raised, status } = req.body;
    const { rows } = await db.query(
      `UPDATE items SET
         name = COALESCE($1, name),
         description = COALESCE($2, description),
         image_url = COALESCE($3, image_url),
         target_cost = COALESCE($4, target_cost),
         raised = COALESCE($5, raised),
         status = COALESCE($6, status)
       WHERE id = $7
       RETURNING *`,
      [name, description, image_url, target_cost, raised, status, req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Item not found' });
    res.json(rows[0]);
  } catch (e) { next(e); }
}

async function remove(req, res, next) {
  try {
    await db.query('DELETE FROM items WHERE id = $1', [req.params.id]);
    res.status(204).end();
  } catch (e) { next(e); }
}

module.exports = { list, getOne, create, update, remove };
