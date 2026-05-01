---
name: divyam-hospital-unified-agent
version: 3.0.0
model: claude-opus-4-6 (thinking)
description: >
  Unified all-in-one agent for Divyam Hospital platform.
  Single Claude Opus 4.6 Thinking orchestrator that internally routes
  to specialized skill agents for each domain. All skills merged into
  one file for seamless execution.
trigger_keywords:
  - divyam hospital
  - divyamhospital.online
  - hospital website
  - build platform
  - spline 3d
  - magic ui
  - 21st.dev
  - admin dashboard
  - mobile app
author: AntiGravity Unified Agent System
license: MIT
---

# 🧠 DIVYAM HOSPITAL — UNIFIED AGENT

## AGENT ARCHITECTURE

```
┌─────────────────────────────────────────────────────┐
│          CLAUDE OPUS 4.6 THINKING (PRIMARY)         │
│              Unified Orchestrator Agent              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ SKILL #1 │ │ SKILL #2 │ │ SKILL #3 │           │
│  │ MASTER   │ │ SPLINE   │ │ 21ST.DEV │           │
│  │ PROJECT  │ │ 3D/R3F   │ │ MAGIC UI │           │
│  └──────────┘ └──────────┘ └──────────┘           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ SKILL #4 │ │ SKILL #5 │ │ SKILL #6 │           │
│  │ SUPABASE │ │ FIREBASE │ │ MOBILE   │           │
│  │ DATABASE │ │ HOSTING  │ │ CAPACITOR│           │
│  └──────────┘ └──────────┘ └──────────┘           │
│  ┌──────────┐ ┌──────────┐                         │
│  │ SKILL #7 │ │ SKILL #8 │                         │
│  │ DASHBOARD│ │ SEO/PERF │                         │
│  │ CMS+AI   │ │ OPTIMIZE │                         │
│  └──────────┘ └──────────┘                         │
│                                                     │
│  MCP SERVERS: supabase · firebase · context7        │
└─────────────────────────────────────────────────────┘
```

## AUTO-ROUTING TABLE

| Task Pattern | Skill Activated | Priority |
|---|---|---|
| Monorepo setup, config, types, env | SKILL #1 MASTER | 🔴 |
| Spline embed, Three.js, R3F, GLTF, particles | SKILL #2 SPLINE 3D | 🟡 |
| ShimmerButton, MagicCard, BentoGrid, NumberTicker, Marquee | SKILL #3 21ST.DEV | 🟡 |
| DB migrations, RLS, queries, auth, storage | SKILL #4 SUPABASE | 🔴 |
| Hosting, push notifications, FCM | SKILL #5 FIREBASE | 🟢 |
| Mobile PWA, Capacitor, bottom nav, haptics | SKILL #6 MOBILE | 🟡 |
| Dashboard CMS, charts, CRUD, AI panel | SKILL #7 DASHBOARD | 🟡 |
| Lighthouse, meta tags, Schema.org, Core Web Vitals | SKILL #8 SEO/PERF | 🟢 |

---

## SKILL #1: MASTER PROJECT

### Brand Config Source
```typescript
// packages/config/site-config.ts — SINGLE SOURCE OF TRUTH
export const SITE_CONFIG = {
  hospitalName: "Divyam Hospital",
  tagline: "Multi-Specialty Healthcare",
  subTagline: "Gangashahar's Pride",
  phone1: "9413912974", phone2: "8197353157",
  email: "info@divyamhospital.online",
  address: "10-A Mahabalipuram, Nokha Road, Gangashahar, Bikaner – 334401",
  whatsapp: "919413912974",
  domain: "divyamhospital.online",
  colors: {
    primary: "#FF6B6B", primaryDark: "#E05555",
    teal: "#4ECDC4", gold: "#FFD700",
    darkBg: "#0A0E1A", cardBg: "#111827",
  },
} as const;
```

### Monorepo Structure
```
divyam-hospital/
├── apps/web/          # Desktop (React+Vite+Spline)
├── apps/mobile/       # Mobile PWA (React+Capacitor)
├── apps/dashboard/    # Admin (React+Supabase)
├── packages/config/   # site-config.ts
├── packages/types/    # TypeScript interfaces
├── packages/ui/       # Shared components
├── packages/api/      # Supabase client
├── supabase/migrations/
├── workers/rating-worker.js
└── package.json       # pnpm workspaces
```

### Mandatory First Steps
1. Read `skill install/PRD_DIVYAM_HOSPITAL.md` completely
2. Load SITE_CONFIG brand data
3. Check existing files — never overwrite migrations or .env
4. State which phase/section you are building before starting

---

## SKILL #2: SPLINE 3D + THREE.JS

### Philosophy
3D must ENHANCE, not block. Every 3D scene:
1. Has emoji/CSS fallback if Spline fails
2. Is lazy-loaded (never blocks FCP)
3. Is paused when off-viewport (IntersectionObserver)
4. Degrades gracefully on low-end devices

### Dependencies
```bash
pnpm add @splinetool/react-spline @splinetool/runtime
pnpm add three @react-three/fiber @react-three/drei @react-three/postprocessing
pnpm add -D @types/three
pnpm add gsap
```

### Spline Wrapper (Always Use)
```tsx
import Spline from '@splinetool/react-spline';
import { Suspense } from 'react';

function SplineScene({ url, className }: { url: string; className?: string }) {
  return (
    <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-[var(--card-bg)] to-[var(--dark-bg)] rounded-2xl animate-pulse flex items-center justify-center"><div className="text-6xl opacity-20">🏥</div></div>}>
      <Spline scene={url} className={className} />
    </Suspense>
  );
}
```

### Three.js Canvas Standard
```tsx
<Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, Math.min(2, window.devicePixelRatio)]}>
  <ambientLight intensity={0.5} />
  <pointLight position={[10, 10, 10]} color="#FF6B6B" />
  <pointLight position={[-10, -10, -10]} color="#4ECDC4" />
  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
</Canvas>
```

### Scene Catalog
| Scene | Section | Content |
|---|---|---|
| hero-bg | Hero | Floating hospital + crosses + particles |
| heart-3d | Cardiology | Distort sphere, beating animation |
| dna-helix | About | Dual strand helix, brand colors |
| particle-field | Background | 200 teal particles, slow rotation |
| service-icons | Service Cards | Icosahedron per specialty |

### Performance Rules
- Use `useInView` to mount/unmount 3D when off-screen
- Cap DPR: `dpr={[1, 1.5]}` on mobile
- Detect low-end: `navigator.hardwareConcurrency <= 2` → show CSS fallback
- Always show skeleton while loading

### Spline Guides (Reference)
- `spline-3d-integration/guides/REACT_INTEGRATION.md`
- `spline-3d-integration/guides/PERFORMANCE.md`
- `spline-3d-integration/guides/COMMON_PROBLEMS.md`
- `spline-3d-integration/guides/VANILLA_INTEGRATION.md`

---

## SKILL #3: 21ST.DEV MAGIC UI

### Install Commands
```bash
pnpm dlx shadcn@latest init
npx shadcn@latest add "https://21st.dev/r/aceternity/shimmer-button"
npx shadcn@latest add "https://21st.dev/r/aceternity/magic-card"
npx shadcn@latest add "https://21st.dev/r/aceternity/number-ticker"
npx shadcn@latest add "https://21st.dev/r/aceternity/morphing-text"
npx shadcn@latest add "https://21st.dev/r/aceternity/particles"
npx shadcn@latest add "https://21st.dev/r/aceternity/animated-beam"
npx shadcn@latest add "https://21st.dev/r/aceternity/marquee"
npx shadcn@latest add "https://21st.dev/r/aceternity/confetti"
npx shadcn@latest add "https://21st.dev/r/aceternity/sparkles"
npx shadcn@latest add "https://21st.dev/r/aceternity/word-rotate"
npx shadcn@latest add "https://21st.dev/r/aceternity/bento-grid"
npx shadcn@latest add "https://21st.dev/r/aceternity/globe"
```

### Component → Section Mapping
| Component | Section | Purpose |
|---|---|---|
| MorphingText | Hero | Rotating taglines |
| Particles | Hero | Background field |
| ShimmerButton | All CTAs | Primary action buttons |
| NumberTicker | Stats | Animated counters |
| BentoGrid | Services (desktop) | Premium card layout |
| MagicCard | Services, Doctors | Hover glow effect |
| WordRotate | Hero subtitle | Specialty rotation |
| Marquee | Below hero | Certifications ticker |
| AnimatedBeam | About/Why | Team connections |
| SparklesCore | Stats, Why Choose | Premium highlights |
| Globe | About/Footer | Location visualization |
| Confetti | Appointment success | Celebration feedback |

### Dark Theme Overrides
```css
.magic-card { --card-background: #111827; }
.bento-card { background: #111827; border-color: rgba(255,255,255,0.08); }
[data-theme="dark"] .shimmer-button-bg { background: #FF6B6B; }
```

---

## SKILL #4: SUPABASE DATABASE

### Tables (7 total)
`services` · `doctors` · `appointments` · `reviews` · `blog_posts` · `inquiries` · `site_config` · `patients`

### RLS Rules
- Default: authenticated read, service_role write
- Exception: `appointments` + `inquiries` → public INSERT

### Client Setup
```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';
export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

### Rules
- Always handle loading, error, empty states
- Use React Query for caching
- Enable Realtime only on `appointments` table (dashboard)
- Migration file: `supabase/migrations/001_init.sql`

---

## SKILL #5: FIREBASE + HOSTING

### Used For
- Push notifications (FCM) → mobile app
- Hosting fallback (if not Cloudflare Pages)

### MCP Server Active
```json
{ "command": "npx", "args": ["-y", "firebase-tools@latest", "experimental:mcp"] }
```

---

## SKILL #6: MOBILE (CAPACITOR PWA)

### Bottom Navigation (Material 3)
```
🏠 Home | 🏥 Services | 👨‍⚕️ Doctors | 📋 My Health | 👤 Profile
```
- Active: filled icon + colored pill + label
- Inactive: outline icon only
- Height: 64px + safe area
- Spring animation on tab change

### Mobile UX Patterns
- Haptic feedback on CTAs
- Pull-to-refresh on lists
- Bottom sheet modals
- Skeleton loading states
- Safe area insets (notch/gesture bar)
- PWA installable (manifest + SW)

### Auth Flow
Phone OTP → Profile setup → Appointments tab

---

## SKILL #7: ADMIN DASHBOARD

### Pages
Overview (KPIs + Recharts) · Appointments (calendar + CRUD) · Doctors (CRUD + photo) · Services (CMS toggle) · CMS (all sections) · Reviews (moderate) · Blog (TipTap) · Inquiries · AI Panel (OpenRouter) · Settings

### CMS = Full Frontend Control
Every section toggle ON/OFF, edit content, reorder items → reflects instantly on website.

### AI Panel
```
Provider: OpenRouter → claude-opus-4-6 / gemini-2.5-pro (switchable)
Tasks: summarize appointments, draft WhatsApp, generate blog, analyze trends
```

---

## SKILL #8: SEO + PERFORMANCE

### SEO
- React Helmet Async per page
- Schema.org Hospital JSON-LD
- Title: "Divyam Hospital | Best Multi-Specialty Hospital in Bikaner"
- Sitemap.xml + robots.txt

### Performance Budget
FCP < 1.2s · LCP < 2.5s · CLS < 0.1 · TTI < 3.5s · Lighthouse ≥ 95

### Strategies
- Spline: lazy load + skeleton
- Images: WebP, lazy, srcset
- Fonts: preload, font-display: swap
- Code split per route
- Service Worker for offline

---

## CSS DESIGN SYSTEM

```css
:root {
  --primary: #FF6B6B;
  --primary-dark: #E05555;
  --teal: #4ECDC4;
  --gold: #FFD700;
  --dark-bg: #0A0E1A;
  --card-bg: #111827;
  --card-border: rgba(255,255,255,0.08);
  --text-primary: #FFFFFF;
  --text-muted: rgba(255,255,255,0.65);
  --gradient-hero: linear-gradient(135deg, #FF6B6B 0%, #FFD700 50%, #4ECDC4 100%);
  --shadow-card: 0 8px 32px rgba(0,0,0,0.4);
  --blur-glass: blur(20px);
}
```

---

## BUILD PHASES

### Phase 0: Foundation 🔴
Monorepo → packages → migrations → seed → env

### Phase 2: Desktop Web 🟡
Scaffold → 21st.dev install → Spline setup → Header/Footer → Hero(3D) → 10 sections → Widgets → SEO → Lighthouse

### Phase 3: Mobile 🟡
Scaffold → Capacitor → BottomNav → 5 screens → OTP auth → PWA → test widths

### Phase 4: Dashboard 🟡
Scaffold → Auth → Overview → Appointments → Doctors → CMS → Reviews → Blog → AI → Settings

### Phase 5: Integration 🔴
E2E tests → CMS sync → Lighthouse → docs → package ZIP

---

## QUALITY GATES

- [ ] TypeScript: zero errors
- [ ] Mobile: tested at 375px, 390px, 414px
- [ ] 3D: skeleton during load, CSS fallback
- [ ] All CTAs: correct phone/WA from SITE_CONFIG
- [ ] Forms: zod validation, error messages
- [ ] Supabase: RLS on all tables
- [ ] Lighthouse ≥ 90
- [ ] Emergency button visible on all breakpoints
- [ ] No competitor hospital names anywhere

---

## REFERENCE FILES

| File | Purpose |
|---|---|
| `skill install/PRD_DIVYAM_HOSPITAL.md` | Full product requirements |
| `skill install/SKILL_ANTIGRAVITY_MASTER.md` | Master project skill |
| `skill install/SKILL_SPLINE_3D.md` | 3D integration rules |
| `skill install/SKILL_21STDEV.md` | Magic UI components |
| `skill install/PROMPT_MASTER.md` | Execution prompt |
| `skill install/TASK_LIST.md` | 96 tasks, 5 phases |
| `skill install/WORKFLOW_DIAGRAM.md` | Mermaid build flow |
| `skill install/INSTALL.md` | Setup guide |
| `spline-3d-integration/SKILL.md` | Spline integration skill |
| `spline-3d-integration/guides/` | React, Vanilla, Perf, Problems |
| `spline-3d-integration/examples/` | Working code examples |
| `packages/config/site-config.ts` | Brand config (live) |
| `supabase/migrations/001_init.sql` | DB schema |
| `workers/rating-worker.js` | JD rating proxy |

---

## MCP SERVERS (Active)

```json
{
  "mcpServers": {
    "supabase": { "command": "npx", "args": ["-y", "supabase", "--experimental", "mcp"] },
    "firebase": { "command": "npx", "args": ["-y", "firebase-tools@latest", "experimental:mcp"] },
    "context7": { "command": "npx", "args": ["-y", "@upstash/context7-mcp@latest"] }
  }
}
```

---

## EXECUTION COMMAND

**To start building, send this to Antigravity:**

```
Read AGENT.md, then execute all 5 phases automatically.
Start with Phase 0 Foundation. Do not ask questions.
```

*Unified Agent v3.0 | All 8 skills merged | Claude Opus 4.6 Thinking*
