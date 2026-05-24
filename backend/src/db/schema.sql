-- =========================================================
-- Church Fundraiser System — PostgreSQL schema
-- Run in Supabase SQL editor or via: psql $DATABASE_URL -f schema.sql
-- =========================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------- Users (admins/staff for the dashboard) ----------
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name     VARCHAR(120) NOT NULL,
  email         VARCHAR(160) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(20)  NOT NULL DEFAULT 'admin'
                CHECK (role IN ('admin','staff')),
  created_at   ' DEFAULT NOW()
);

-- ---------- Fundraising goal (single row, updated by admin) ----------
CREATE TABLE IF NOT EXISTS fundraiser_goal (
  id          INT PRIMARY KEY DEFAULT 1,
  title       VARCHAR(160) NOT NULL DEFAULT 'Church Fundraiser 2026',
  goal_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  currency    VARCHAR(8)   NOT NULL DEFAULT 'KES',
  event_date  DATE         NOT NULL DEFAULT DATE '2026-06-01',
  CONSTRAINT single_row CHECK (id = 1)
);

-- ---------- Contributions ----------
CREATE TABLE IF NOT EXISTS contributions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contributor     VARCHAR(160) NOT NULL,
  amount          NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  method          VARCHAR(40)  NOT NULL DEFAULT 'cash'
                  CHECK (method IN ('cash','bank','mobile_money','card','other')),
  note            TEXT,
  contributed_at ' DEFAULT NOW(),
  recorded_by     UUID REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_contrib_date ON contributions(contributed_at DESC);

-- ---------- Items / instruments being purchased ----------
CREATE TABLE IF NOT EXISTS items (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         VARCHAR(160) NOT NULL,
  description  TEXT,
  image_url    TEXT,
  target_cost  NUMERIC(12,2) NOT NULL CHECK (target_cost >= 0),
  raised       NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (raised >= 0),
  status       VARCHAR(20)  NOT NULL DEFAULT 'pending'
               CHECK (status IN ('pending','partially_funded','funded','purchased')),
  created_at  ' DEFAULT NOW()
);

-- ---------- RSVPs / attendance ----------
CREATE TABLE IF NOT EXISTS rsvps (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   VARCHAR(160) NOT NULL,
  email       VARCHAR(160) NOT NULL,
  phone       VARCHAR(40),
  guests      INT NOT NULL DEFAULT 1 CHECK (guests BETWEEN 1 AND 20),
  message     TEXT,
  created_at ' DEFAULT NOW(),
  UNIQUE(email)
);

-- ---------- Events ----------
CREATE TABLE IF NOT EXISTS events (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        VARCHAR(160) NOT NULL,
  description  TEXT,
  poster_url   TEXT,
  starts_at   ' NOT NULL,
  location     VARCHAR(200),
  created_at  ' DEFAULT NOW()
);

-- ---------- Media gallery ----------
CREATE TABLE IF NOT EXISTS media (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caption     VARCHAR(200),
  image_url   TEXT NOT NULL,
  created_at ' DEFAULT NOW()
);

-- =========================================================
-- Seed data
-- =========================================================

-- Admin user (password: admin123 — bcrypt hash, cost 10)
INSERT INTO users (full_name, email, password_hash, role)
VALUES (
  'Church Admin',
  'admin@church.org',
  '$2a$10$Yx3eO8r1V4pY8q7L0i6m5eU4j9a3b2c1d0e9f8g7h6i5j4k3l2m1n', -- replaced below
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- Update admin password to a real bcrypt hash for "admin123"
UPDATE users
SET password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE email = 'admin@church.org';

-- Fundraiser goal
INSERT INTO fundraiser_goal (id, title, goal_amount, currency, event_date)
VALUES (1, 'Church Fundraiser 2026', 500000, 'KES', DATE '2026-06-01')
ON CONFLICT (id) DO NOTHING;

-- Sample items
INSERT INTO items (name, description, target_cost, raised, status) VALUES
  ('Grand Piano', 'Acoustic grand piano for the main sanctuary', 12000, 4500, 'partially_funded'),
  ('Drum Kit',    'Full 5-piece drum kit with cymbals',          2500,  800,  'partially_funded'),
  ('PA System',   'Mixer, speakers and microphones',             6000,  6000, 'funded'),
  ('Choir Robes', 'Set of 30 choir robes',                       3000,  0,    'pending')
ON CONFLICT DO NOTHING;

-- CPM Mbita fundraiser items (with images served from frontend assets)
INSERT INTO items (name, description, image_url, target_cost, raised, status) VALUES
  ('Yamaha PSR Keyboard',        'Arranger workstation keyboard for worship music & choir accompaniment.', '/assets/item-keyboard.png',     180000, 40000, 'partially_funded'),
  ('TAMA 5-Piece Drum Kit',      'Acoustic drum kit with cymbals & hardware for the worship team.',        '/assets/item-drums.png',        120000, 30000, 'partially_funded'),
  ('Honda Power Generator',      'Backup generator to power services and events during outages.',          '/assets/item-generator.png',     95000, 15000, 'partially_funded'),
  ('JBL Line-Array Speakers',    'High-power JBL speakers for clear sanctuary sound.',                     '/assets/item-jbl-speaker.png',  220000, 60000, 'partially_funded'),
  ('JBL SRX718S Subwoofer',      'Dual 18" high-power subwoofer for full-range worship sound.',            '/assets/item-subwoofer.png',    160000, 20000, 'partially_funded'),
  ('Congregation Chairs (200)',  'Durable stackable chairs to seat our growing congregation.',             '/assets/item-chairs.png',       300000, 75000, 'partially_funded'),
  ('Wireless Microphone Set',    '4-channel professional wireless microphone system.',                     '/assets/item-wireless-mics.png', 45000, 10000, 'partially_funded'),
  ('Corded Vocal Microphones',   'Cardioid moving-coil microphones for the choir and pulpit.',             '/assets/item-corded-mic.png',    18000,  5000, 'partially_funded'),
  ('DBX Audio Processor',        'Digital signal processor for clean, balanced PA audio.',                 '/assets/item-dbx-processor.png', 70000,     0, 'pending'),
  ('Sanctuary Curtains',         'Heavy-duty stage and window curtains for the sanctuary.',                '/assets/item-curtains.png',      40000,     0, 'pending')
ON CONFLICT DO NOTHING;

-- Sample event
INSERT INTO events (title, description, starts_at, location) VALUES
  ('Fundraiser Gala 2026',
   'Join us for an evening of worship, music and community as we raise funds for new instruments.',
  ' '2026-06-01 17:00:00+00',
   'Grace Community Church, Main Hall')
ON CONFLICT DO NOTHING;

-- Add poster images to events (idempotent updates)
UPDATE events SET poster_url = 'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?auto=format&fit=crop&w=1200&q=80'
WHERE title = 'Fundraiser Gala 2026' AND (poster_url IS NULL OR poster_url = '');

-- Additional sample events with posters
INSERT INTO events (title, description, poster_url, starts_at, location) VALUES
  ('Worship Night',
   'An evening of praise, worship and prayer led by our combined choirs.',
   'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80',
  ' '2026-05-10 18:30:00+00',
   'Grace Community Church, Sanctuary'),
  ('Community Outreach Day',
   'Serving our neighborhood with food, prayer and fellowship.',
   'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
  ' '2026-05-24 09:00:00+00',
   'Church Grounds & City Park')
ON CONFLICT DO NOTHING;

-- Seed media gallery with sample photos from Supabase Storage
INSERT INTO media (caption, image_url) VALUES
  ('Leaders fellowship gathering',           'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-01.png'),
  ('Lakeside baptism preparation',           'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-02.png'),
  ('Congregants by the lake',                'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-03.png'),
  ('Sunday service – mothers & leaders',     'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-04.png'),
  ('Baptism in Lake Victoria',               'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-05.png'),
  ('Church family at the shoreline',         'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-06.png'),
  ('Community outreach at Mbita market',     'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-07.png'),
  ('Youth & congregation worship service',   'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-08.png'),
  ('Leaders meeting at Bimoss',              'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-09.png'),
  ('Outdoor leaders fellowship',             'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-10.png'),
  ('Mothers attending service',              'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-11.png'),
  ('Baptism in the lake',                    'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-12.png'),
  ('Prayer at the lakeside',                 'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-13.png'),
  ('Open-air evangelism at the market',      'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-14.png'),
  ('Leaders strategy meeting',               'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-15.png'),
  ('Youth conference gathering',             'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-16.png'),
  ('Street preaching in Mbita town',         'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-17.png'),
  ('Lakeside ministry team',                 'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-18.png'),
  ('Sunday worship congregation',            'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-19.png'),
  ('Clergy gathering at C.O.P sanctuary',     'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-20.png'),
  ('Church family after Sunday service',     'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-21.png'),
  ('Testimony time during service',          'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-22.png'),
  ('Pastor addressing the congregation',     'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-23.png'),
  ('Sunday service congregation under the shelter', 'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-24.png'),
  ('Worship leaders ministering in song',    'https://sivswtfpmgylqiukzmeb.supabase.co/storage/v1/object/public/gallery/gallery-25.png')
ON CONFLICT DO NOTHING;
