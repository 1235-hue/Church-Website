# 🗄️ Database Setup Guide (Supabase PostgreSQL)

This guide walks you through provisioning the database for the Church Fundraiser System using **Supabase** (free tier is enough).

---

## 1. Create a Supabase project

1. Go to https://supabase.com and sign in (GitHub login is easiest).
2. Click **New project**.
3. Fill in:
   - **Name**: `church-fundraiser`
   - **Database Password**: *(choose a strong password — save it, you'll need it)*
   - **Region**: pick the one closest to your congregation.
4. Click **Create new project** and wait ~2 minutes for provisioning.

---

## 2. Run the schema

1. In the left sidebar, open **SQL Editor**.
2. Click **+ New query**.
3. Open the file `backend/src/db/schema.sql` from this repo.
4. Copy the **entire contents** and paste into the SQL editor.
5. Click **Run** (or press `Ctrl/Cmd + Enter`).

You should see: `Success. No rows returned.`

This creates all tables (`users`, `fundraiser_goal`, `contributions`, `items`, `rsvps`, `events`, `media`) and seeds:
- Admin user → `admin@church.org` / `admin123`
- Fundraiser goal (target: $25,000, event date: 2026-06-01)
- Sample items and one sample event

---

## 3. Verify the tables

1. Go to **Table Editor** in the sidebar.
2. You should see 7 tables listed.
3. Click `users` — one row: `admin@church.org`.
4. Click `items` — four sample instruments.

---

## 4. Grab your connection string

1. In the sidebar, open **Project Settings** → **Database**.
2. Scroll to **Connection string** → choose **URI** tab.
3. Copy the string. It looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres
   ```
4. Replace `[YOUR-PASSWORD]` with the database password you set in step 1.

---

## 5. Wire it into the backend

1. In `backend/`, copy the env template:
   ```bash
   cd backend
   cp .env.example .env
   ```
2. Open `.env` and fill in:
   ```env
   PORT=4000
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxxxxxxxxx.supabase.co:5432/postgres
   JWT_SECRET=change-me-to-a-long-random-string
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=http://localhost:5173
   ```
3. Install and start:
   ```bash
   npm install
   npm run dev
   ```
4. You should see: `✅ Server running on http://localhost:4000`

---

## 6. Test the connection

```bash
curl http://localhost:4000/api/fundraiser/goal
```

Expected response:
```json
{ "id": 1, "title": "Church Fundraiser 2026", "goal_amount": "25000.00", "currency": "USD", "event_date": "2026-06-01" }
```

---

## 7. Log in as admin

Frontend:
```bash
cd ../frontend
cp .env.example .env      # VITE_API_URL defaults to http://localhost:4000/api
npm install
npm run dev
```

Open http://localhost:5173/login and sign in with:
- **Email**: `admin@church.org`
- **Password**: `admin123`

> ⚠️ **Change this password immediately in production.** Either do it from the admin dashboard (once you add a "change password" screen) or run this in Supabase SQL Editor after generating a new bcrypt hash:
> ```sql
> UPDATE users SET password_hash = '<new-bcrypt-hash>' WHERE email = 'admin@church.org';
> ```

---

## 8. (Optional) Deploying

- **Backend → Render**: Add `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN` as environment variables. Build command: `npm install`. Start command: `npm start`.
- **Frontend → Vercel**: Set `VITE_API_URL` to your Render backend URL (e.g. `https://church-fundraiser-api.onrender.com/api`).
- **Supabase**: nothing more to do — it's already hosted.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `password authentication failed` | Wrong DB password in `DATABASE_URL`. Reset it in Supabase → Settings → Database. |
| `relation "users" does not exist` | You didn't run `schema.sql`. Repeat step 2. |
| `SSL required` | Supabase requires SSL. The backend's `pg` config already handles this — ensure you're using the full connection string from Supabase (not a local one). |
| Can't log in with admin credentials | The seed hash corresponds to `admin123`. If you re-ran the schema and changed things, re-run the `UPDATE users SET password_hash = ...` line from `schema.sql`. |

---

Done! Your database is live and ready. 🎉
