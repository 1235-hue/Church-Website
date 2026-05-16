const db = require('../config/db');

async function list(req, res, next) {
  try {
    const { rows } = await db.query('SELECT * FROM events ORDER BY starts_at ASC');
    res.json(rows);
  } catch (e) { next(e); }
}

async function create(req, res, next) {
  try {
    const { title, description, poster_url, starts_at, location } = req.body;
    const { rows } = await db.query(
      `INSERT INTO events (title, description, poster_url, starts_at, location)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [title, description || null, poster_url || null, starts_at, location || null]
    );
    res.status(201).json(rows[0]);
  } catch (e) { next(e); }
}

async function update(req, res, next) {
  try {
    const { title, description, poster_url, starts_at, location } = req.body;
    const { rows } = await db.query(
      `UPDATE events SET
         title = COALESCE($1, title),
         description = COALESCE($2, description),
         poster_url = COALESCE($3, poster_url),
         starts_at = COALESCE($4, starts_at),
         location = COALESCE($5, location)
       WHERE id = $6 RETURNING *`,
      [title, description, poster_url, starts_at, location, req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Event not found' });
    res.json(rows[0]);
  } catch (e) { next(e); }
}

async function remove(req, res, next) {
  try {
    await db.query('DELETE FROM events WHERE id = $1', [req.params.id]);
    res.status(204).end();
  } catch (e) { next(e); }
}

module.exports = { list, create, update, remove };
