# 💖 Church Fundraiser System

A modern full-stack web platform for the Church Fundraiser event on **1st June 2026**.

Track contributions in real time, RSVP for the event, browse instruments/items being purchased, view the media gallery, and join the WhatsApp community.

## 🏗️ Architecture

Monorepo with two independent apps:

```
church-fundraiser-system/
├── frontend/   # React + Vite + TypeScript + Tailwind
├── backend/    # Node.js + Express + JWT + Swagger
└── README.md
```

Database: **Supabase PostgreSQL** (you can also point the backend at any standard PostgreSQL instance — it uses the `pg` driver).

## 🧰 Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Axios, React Router, Zustand
**Backend:** Node.js, Express, JWT, bcrypt, Swagger (swagger-ui-express), Helmet, CORS, express-validator, pg
**DB:** Supabase PostgreSQL (or any PostgreSQL ≥ 14)

## 🚀 Quick Start

### 1. Database

In the Supabase SQL editor (or `psql`), run `backend/src/db/schema.sql`.
This creates all tables and seeds an admin user (`admin@church.org` / `admin123`) and demo data.

### 2. Backend

```bash
cd backend
cp .env.example .env       # fill in DB + JWT settings
npm install
npm run dev                # http://localhost:4000
```

Swagger docs: `http://localhost:4000/api-docs`

### 3. Frontend

```bash
cd frontend
cp .env.example .env       # set VITE_API_URL=http://localhost:4000/api
npm install
npm run dev                # http://localhost:5173
```

## 🔐 Default Admin Login

- Email: `admin@church.org`
- Password: `admin123`

**Change this immediately in production.**

## 🚀 Deployment

- **Frontend → Vercel:** set `VITE_API_URL` env var to your backend URL.
- **Backend → Render:** create a Web Service from `/backend`, set env vars from `.env.example`.
- **Database → Supabase:** create a project, run `schema.sql`, copy the connection string into the backend `DATABASE_URL`.

## 📚 Features

- Real-time fundraising progress (goal vs. raised)
- Public RSVP form with attendee list (admin view)
- Catalog of instruments/items with funding status per item
- Events page with posters and descriptions
- Media gallery
- WhatsApp community link & embedded Google Map
- Admin dashboard (JWT-protected) to manage everything

## 📜 License

MIT
