# Auth & Roles Update

## What changed

- **Public**: only the Home hero (logo, title, event info, total progress bar, Login/Register buttons) plus footer.
- **Regular users (`role = 'user'`)**: can register themselves; see all public pages plus their own contributions and a personal dashboard at `/dashboard`.
- **Admin (`role = 'admin'`)**: created **only** in SQL — no admin signup in the app. Logging in with an admin email redirects to `/admin`.
- **Google sign-in**: shown only when `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` are set in `frontend/.env`. Uses Supabase Auth → posts the verified Google profile to `POST /api/auth/google`, which returns our app JWT (admin if the email matches a pre-seeded admin row, otherwise `user`).
- **JWT** still goes in `localStorage` and is attached as `Authorization: Bearer …`. 401 responses now auto-logout and redirect to `/login`. Token TTL defaults to 24h (`JWT_EXPIRES_IN`).

## How to run the migration

After the original `schema.sql`, run:

```bash
psql "$DATABASE_URL" -f backend/src/db/02_auth_users.sql
```

This:
1. Adds `'user'` to the `users.role` CHECK constraint and sets it as the default.
2. Adds `phone` to `users` and `user_id` / `item_id` / `phone` to `contributions`.
3. Pre-creates the admin account.

## Setting your real admin email

Open `backend/src/db/02_auth_users.sql` and replace `pastor@cpmmbita.org` with your real admin email **before** running. The default password hash is for `ChangeMe123!` — change it after first login (or update the row directly in Supabase with a new bcrypt hash).

To generate a new bcrypt hash:

```bash
node -e "console.log(require('bcryptjs').hashSync('YourNewPassword', 10))"
```

Then:

```sql
UPDATE users SET password_hash = '<paste hash>' WHERE email = 'pastor@cpmmbita.org';
```

## New endpoints

| Method | Path                  | Auth     | Purpose                                |
|--------|-----------------------|----------|----------------------------------------|
| POST   | `/api/auth/register`  | public   | Self-registration (always `role=user`) |
| POST   | `/api/auth/login`     | public   | Returns `{ token, user }`              |
| POST   | `/api/auth/google`    | public   | Sync Supabase Google sign-in           |
| GET    | `/api/contributions`  | required | Admin: all rows. User: only own.       |

## Frontend env (optional Google)

`frontend/.env`:

```
VITE_API_URL=http://localhost:4000/api
VITE_WHATSAPP_URL=https://chat.whatsapp.com/your-link
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

In Supabase → Authentication → Providers → enable **Google** and add `http://localhost:5173/login` as a redirect URL.
