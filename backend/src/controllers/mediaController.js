const db = require('../config/db');

async function list(req, res, next) {
  try {
    const { rows } = await db.query('SELECT * FROM media ORDER BY created_at DESC');
    res.json(rows);
  } catch (e) { next(e); }
}

async function create(req, res, next) {
  try {
    const { caption, image_url } = req.body;
    const { rows } = await db.query(
      'INSERT INTO media (caption, image_url) VALUES ($1,$2) RETURNING *',
      [caption || null, image_url]
    );
    res.status(201).json(rows[0]);
  } catch (e) { next(e); }
}

async function remove(req, res, next) {
  try {
    await db.query('DELETE FROM media WHERE id = $1', [req.params.id]);
    res.status(204).end();
  } catch (e) { next(e); }
}

module.exports = { list, create, remove };
