// Auth: register (public, role=user) + login (any role) + Google OAuth sync
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, full_name: user.full_name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
}

function publicUser(u) {
  return { id: u.id, full_name: u.full_name, email: u.email, role: u.role, phone: u.phone };
}

async function register(req, res, next) {
  try {
    const { full_name, email, phone, password } = req.body;
    const emailNorm = String(email).toLowerCase().trim();
    const exists = await db.query('SELECT 1 FROM users WHERE email=$1', [emailNorm]);
    if (exists.rowCount) return res.status(409).json({ error: 'Email already registered' });

    const password_hash = await bcrypt.hash(password, 10);
    // Force role = 'user' — never trust the request body
    const { rows } = await db.query(
      `INSERT INTO users (full_name, email, phone, password_hash, role)
       VALUES ($1,$2,$3,$4,'user')
       RETURNING id, full_name, email, phone, role`,
      [full_name, emailNorm, phone || null, password_hash]
    );
    const user = rows[0];
    res.status(201).json({ token: signToken(user), user: publicUser(user) });
  } catch (e) { next(e); }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { rows } = await db.query(
      'SELECT id, full_name, email, phone, password_hash, role FROM users WHERE email = $1',
      [String(email).toLowerCase().trim()]
    );
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    res.json({ token: signToken(user), user: publicUser(user) });
  } catch (e) { next(e); }
}

/**
 * Google OAuth sync.
 * The frontend signs in with Supabase Google OAuth, then POSTs the verified
 * Google profile here. We look up / create the user and return our own JWT.
 * If the email matches a pre-seeded admin row, the existing role='admin' is kept.
 */
async function googleSync(req, res, next) {
  try {
    const { email, full_name } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    const emailNorm = String(email).toLowerCase().trim();

    let { rows } = await db.query(
      'SELECT id, full_name, email, phone, role FROM users WHERE email=$1',
      [emailNorm]
    );
    let user = rows[0];
    if (!user) {
      // First-time Google user -> always role=user
      const password_hash = await bcrypt.hash(`oauth:${Date.now()}:${Math.random()}`, 10);
      const insert = await db.query(
        `INSERT INTO users (full_name, email, password_hash, role)
         VALUES ($1,$2,$3,'user')
         RETURNING id, full_name, email, phone, role`,
        [full_name || emailNorm.split('@')[0], emailNorm, password_hash]
      );
      user = insert.rows[0];
    }
    res.json({ token: signToken(user), user: publicUser(user) });
  } catch (e) { next(e); }
}

async function me(req, res) { res.json({ user: req.user }); }

async function getProfile(req, res, next) {
  try {
    const { rows } = await db.query(
      'SELECT id, full_name, email, phone, role, created_at FROM users WHERE id=$1',
      [req.user.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (e) { next(e); }
}

async function updateProfile(req, res, next) {
  try {
    const { full_name, phone } = req.body;
    const { rows } = await db.query(
      `UPDATE users SET full_name=COALESCE($1,full_name), phone=$2
       WHERE id=$3 RETURNING id, full_name, email, phone, role, created_at`,
      [full_name, phone || null, req.user.id]
    );
    res.json(rows[0]);
  } catch (e) { next(e); }
}

async function updatePassword(req, res, next) {
  try {
    const { current_password, new_password } = req.body;
    if (!current_password || !new_password || new_password.length < 6) {
      return res.status(400).json({ error: 'Invalid password input' });
    }
    const { rows } = await db.query('SELECT password_hash FROM users WHERE id=$1', [req.user.id]);
    if (!rows[0]) return res.status(404).json({ error: 'User not found' });
    const ok = await bcrypt.compare(current_password, rows[0].password_hash);
    if (!ok) return res.status(401).json({ error: 'Current password is incorrect' });
    const password_hash = await bcrypt.hash(new_password, 10);
    await db.query('UPDATE users SET password_hash=$1 WHERE id=$2', [password_hash, req.user.id]);
    res.json({ ok: true });
  } catch (e) { next(e); }
}

module.exports = { register, login, googleSync, me, getProfile, updateProfile, updatePassword };

