# AIToolsHub — Enterprise AI Tools Directory SaaS

Production-ready Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 + Prisma application inspired by Toolify, Futurepedia, and There's An AI For That.

## Features

- 🌍 **Multilingual** — English, Arabic (full RTL), Spanish, Chinese, Hindi
- 🌓 **Dark/Light theme** with persistence
- 🔍 **AI-powered search** with semantic relevance scoring
- 📂 **100K+ tools directory** with filters, sort, pagination
- ⚖️ **Tool comparison** side-by-side (up to 4 tools)
- 💳 **4 pricing tiers** with monthly/yearly billing toggle
- 👤 **User dashboard** — bookmarks, collections, reviews, analytics
- 🛡️ **Admin dashboard** — tools, moderation, users, audit logs, revenue charts
- 🔌 **REST API** — `/api/tools`, `/api/categories`, `/api/search`, `/api/stats`
- 🎨 **Modern UI** with Framer Motion animations, glass header, aurora background

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| State | Zustand (persisted) |
| Database | Prisma ORM (SQLite dev / PostgreSQL prod) |
| Icons | Lucide React |
| Animation | Framer Motion |

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Push database schema
npm run db:push

# Seed database (optional, mock data is bundled in src/lib/data.ts)
npm run seed

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Option 1: Vercel (Recommended — Easiest)

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — click Deploy
4. Add your custom domain in Project Settings → Domains

### Option 2: Hostinger (Node.js Hosting)

This project is configured to deploy on Hostinger Business+ plans with Node.js support, on the subpath `/AIToolsHub`.

#### Step 1: Push to GitHub

```powershell
# In PowerShell at project root:
git init
git add .
git commit -m "Initial commit: AIToolsHub platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aitoolshub.git
git push -u origin main
```

#### Step 2: Deploy on Hostinger

1. Login to [hPanel](https://hpanel.hostinger.com)
2. Go to **Websites** → **bakrr.net** → **Manage**
3. Go to **Advanced** → **Node.js**
4. Click **Create Node.js App**
5. Configure:
   - **Node.js version**: 20.x
   - **App directory**: `AIToolsHub`
   - **App URL**: `bakrr.net/AIToolsHub`
   - **App root**: `/public_html/AIToolsHub`
   - **Startup file**: `server.js` (we'll create this below)
   - **Environment variables**: see `.env.example`
6. Under **Deployment**, connect your GitHub repo
7. Set **Build command**: `npm install && npm run build`
8. Set **Start command**: `npm start`
9. Click **Deploy**

#### Step 3: Create custom server file

For Hostinger's Node.js setup (using Phusion Passenger), you need a `server.js` at the project root. This file is auto-created by Next.js when using `output: "standalone"`. See `next.config.ts` for the standalone output config.

## Project Structure

```
├── prisma/schema.prisma       # 16-model enterprise database schema
├── scripts/seed.ts            # Database seed script
├── src/
│   ├── app/
│   │   ├── api/               # REST API endpoints
│   │   ├── globals.css        # Design system + animations
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Main page orchestrator
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── sections/          # Hero, Directory, Compare, Pricing, etc.
│   │   ├── shared/            # ToolCard, StarRating
│   │   └── ui/                # shadcn/ui components
│   ├── lib/
│   │   ├── data.ts            # Mock data + 5-locale i18n strings
│   │   ├── i18n.tsx           # I18n context with RTL
│   │   ├── theme.tsx          # Theme provider
│   │   ├── store.ts           # Zustand (bookmarks, compare)
│   │   └── db.ts              # Prisma client
│   └── hooks/
├── next.config.ts             # basePath: /AIToolsHub (for Hostinger)
├── package.json
└── .env.example
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api` | API root with endpoint catalog |
| GET | `/api/tools?q=&category=&pricing=&sort=&page=&limit=` | List tools |
| GET | `/api/categories` | List categories |
| GET | `/api/search?q=` | AI-powered semantic search |
| GET | `/api/stats` | Platform analytics |

## License

MIT — Free to use, modify, and distribute.
