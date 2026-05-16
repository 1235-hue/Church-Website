-- =========================================================
-- Migration: extend users for public registration + role 'user'
-- Run AFTER schema.sql
-- =========================================================

-- 1. Allow 'user' role and add phone column
ALTER TABLE users
  DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users
  ADD CONSTRAINT users_role_check CHECK (role IN ('admin','staff','user'));
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS phone VARCHAR(40);
ALTER TABLE users
  ALTER COLUMN role SET DEFAULT 'user';

-- 2. Link contributions to the user who paid (for "my history")
ALTER TABLE contributions
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS item_id UUID REFERENCES items(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS phone   VARCHAR(40);

-- 3. Pre-create the church admin account.
--    EDIT THIS EMAIL to your real admin address before running.
--    Password is set via the app/Supabase later, or via UPDATE below.
INSERT INTO users (full_name, email, password_hash, role)
VALUES (
  'Church Admin',
  'pastor@cpmmbita.org',
  -- bcrypt hash of "ChangeMe123!" — change immediately after first login
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'admin'
) ON CONFLICT (email) DO UPDATE SET role = 'admin';
