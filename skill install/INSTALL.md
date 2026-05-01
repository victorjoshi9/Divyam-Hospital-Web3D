# INSTALL.md — Divyam Hospital Platform Setup Guide

## Prerequisites
- Node.js 20+ and pnpm 9+
- Supabase account (free tier works)
- Cloudflare account (free tier for Workers + Pages)
- Firebase project (for push notifications)
- OpenRouter API key (for AI dashboard panel)

---

## Step 1: Extract ZIP
```bash
unzip divyam-hospital-v2.zip -d divyam-hospital
cd divyam-hospital
pnpm install
```

## Step 2: Supabase Setup
1. Create project at supabase.com
2. Go to SQL Editor, paste content of `supabase/migrations/001_init.sql` and run
3. Copy your Project URL and anon key from Settings → API

## Step 3: Configure Environment
```bash
# Copy env templates
cp apps/web/.env.example apps/web/.env.local
cp apps/mobile/.env.example apps/mobile/.env.local
cp apps/dashboard/.env.example apps/dashboard/.env.local

# Fill in your values:
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Step 4: Seed Database
```bash
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... pnpm run seed
```

## Step 5: Deploy Cloudflare Worker
```bash
# Edit workers/rating-worker.js — update WORKER_URL on line 7
cd workers
npx wrangler deploy rating-worker.js --name jd-rating
# Copy the deployed URL and add to .env.local: VITE_CF_RATING_WORKER=https://...
```

## Step 6: Start Development
```bash
pnpm dev          # Starts all 3 apps in parallel
# Web:       http://localhost:5173
# Mobile:    http://localhost:5174
# Dashboard: http://localhost:5175
```

## Step 7: Build for Production
```bash
pnpm build:all    # Builds all 3 apps
# Output: apps/web/dist, apps/mobile/dist, apps/dashboard/dist
```

---

## Deploying to Cloudflare Pages
1. Connect GitHub repo to Cloudflare Pages
2. Set build command: `pnpm build:web`
3. Set output directory: `apps/web/dist`
4. Add all env variables from `.env.local`
5. Deploy → your site is live at divyamhospital.online

## Building Android APK
```bash
cd apps/mobile
npx cap sync android
npx cap open android    # Opens Android Studio
# Build → Generate Signed APK
```
