# DIVYAM HOSPITAL — AUTO TASK LIST
## AntiGravity executes these tasks in order. No manual input needed.

---

## LEGEND
- 🔴 CRITICAL — Must complete before next phase
- 🟡 IMPORTANT — Core feature
- 🟢 ENHANCEMENT — Polish layer

---

## PHASE 0: FOUNDATION 🔴

| # | Task | Output | Skill |
|---|---|---|---|
| 0.1 | Read all skill files | Skills loaded | Master |
| 0.2 | Parse PRD_DIVYAM_HOSPITAL.md | Requirements understood | Master |
| 0.3 | Initialize pnpm monorepo | `package.json` with workspaces | Master |
| 0.4 | Create `packages/config/site-config.ts` | Brand config with all hospital data | Master |
| 0.5 | Create `packages/types/index.ts` | TypeScript interfaces for all entities | Master |
| 0.6 | Create `packages/api/client.ts` | Supabase client + React Query setup | Master |
| 0.7 | Create `packages/ui/` shared components | Button, Card, Badge, Input, Modal base | 21st.dev |
| 0.8 | Run Supabase migrations | All 7 tables created | Master |
| 0.9 | Seed database | All services, reviews, blog posts loaded | Master |
| 0.10 | Copy + configure `workers/rating-worker.js` | Cloudflare Worker ready to deploy | Master |
| 0.11 | Create `.env.example` for all 3 apps | Environment template | Master |

---

## PHASE 2: DESKTOP WEB APP 🟡

### Setup
| # | Task | Output |
|---|---|---|
| 2.1 | Scaffold `apps/web/` Vite + React + TS | Project structure |
| 2.2 | Install all npm packages | node_modules |
| 2.3 | Configure Tailwind v4 + CSS variables | `globals.css` with brand tokens |
| 2.4 | Install 21st.dev components via shadcn CLI | Components in `src/components/ui/` |
| 2.5 | Configure React Router v6 | `main.tsx` with routes |

### Layout Components
| # | Task | Output |
|---|---|---|
| 2.6 | `Header.tsx` | Sticky glass nav + logo + emergency btn |
| 2.7 | `Footer.tsx` | 4-col footer + JD rating + copyright |
| 2.8 | `Navigation.tsx` | Desktop nav links with scroll-spy active |
| 2.9 | `MobileMenu.tsx` | Full-screen overlay mobile nav |

### Hero Section (3D)
| # | Task | Output |
|---|---|---|
| 2.10 | `HeroSection.tsx` | Section wrapper |
| 2.11 | `SplineHero.tsx` | Spline embed with CSS fallback |
| 2.12 | `HeroText.tsx` | MorphingText taglines + WordRotate |
| 2.13 | `HeroCTAs.tsx` | ShimmerButton Book + Emergency |
| 2.14 | `HeroStats.tsx` | Floating glassmorphism stat cards |
| 2.15 | `ParticleBackground.tsx` | Three.js or 21st.dev particles |

### Content Sections
| # | Task | Output |
|---|---|---|
| 2.16 | `AboutSection.tsx` | Story + DNA helix 3D + mission |
| 2.17 | `ServicesSection.tsx` | BentoGrid layout |
| 2.18 | `ServiceCard.tsx` | MagicCard + 3D icon |
| 2.19 | `ServiceModal.tsx` | Full detail modal (all 6 services) |
| 2.20 | `DoctorsSection.tsx` | Doctor grid |
| 2.21 | `DoctorCard.tsx` | Photo + flip hover + schedule |
| 2.22 | `StatsSection.tsx` | NumberTicker + SparklesCore |
| 2.23 | `WhyChooseSection.tsx` | Comparison (generic "Other Hospitals") |
| 2.24 | `ReviewsSection.tsx` | Carousel + live JD rating badge |
| 2.25 | `BlogSection.tsx` | 3 health tip cards from DB |
| 2.26 | `ContactSection.tsx` | Map embed + address + contact form |

### Widgets (Always Visible)
| # | Task | Output |
|---|---|---|
| 2.27 | `AppointmentWidget.tsx` | Expandable form → Supabase → confetti |
| 2.28 | `WhatsAppBtn.tsx` | Green pulse button |
| 2.29 | `CallBtn.tsx` | Teal call button |
| 2.30 | `JDRatingBadge.tsx` | Live rating float (CF Worker + fallback 4.4) |
| 2.31 | `ScrollTopBtn.tsx` | Smooth scroll to top |

### Data & SEO
| # | Task | Output |
|---|---|---|
| 2.32 | `useServices.ts` | React Query hook for services table |
| 2.33 | `useReviews.ts` | React Query hook for reviews table |
| 2.34 | `useDoctors.ts` | React Query hook for doctors table |
| 2.35 | `useBlog.ts` | React Query hook for blog_posts table |
| 2.36 | `SEOHead.tsx` | React Helmet + all meta + Schema.org JSON-LD |
| 2.37 | Sitemap generation | `public/sitemap.xml` |
| 2.38 | `robots.txt` | Block `/dashboard`, allow all else |

### Quality
| # | Task | Output |
|---|---|---|
| 2.39 | TypeScript check | Zero TS errors |
| 2.40 | Lighthouse audit | Score ≥ 90 |
| 2.41 | Mobile test 320px | No overflow, all elements visible |

---

## PHASE 3: MOBILE NATIVE WEB APP 🟡

### Setup
| # | Task | Output |
|---|---|---|
| 3.1 | Scaffold `apps/mobile/` | Project structure |
| 3.2 | Install Capacitor + plugins | Mobile shell ready |
| 3.3 | Configure PWA manifest | `manifest.json` (installable) |
| 3.4 | Service worker | Offline capability |

### Navigation
| # | Task | Output |
|---|---|---|
| 3.5 | `BottomNav.tsx` | Material 3 style, 5 tabs, spring animation |
| 3.6 | `AppHeader.tsx` | Status bar aware, back btn, title |
| 3.7 | Tab routing | React Router with history mode |

### Screens
| # | Task | Output |
|---|---|---|
| 3.8 | `HomeScreen.tsx` | Quick actions + specialty horizontal scroll |
| 3.9 | `ServicesScreen.tsx` | Search + filter chips + service list |
| 3.10 | `ServiceDetailScreen.tsx` | Full service detail + Book CTA |
| 3.11 | `DoctorsScreen.tsx` | Search + doctor list |
| 3.12 | `DoctorProfileScreen.tsx` | Profile + schedule + reviews |
| 3.13 | `MyHealthScreen.tsx` | Auth gate → appointment history |
| 3.14 | `ProfileScreen.tsx` | Settings + logout |

### Auth
| # | Task | Output |
|---|---|---|
| 3.15 | `PhoneLoginScreen.tsx` | Enter phone number |
| 3.16 | `OTPScreen.tsx` | 6-digit OTP verification |
| 3.17 | `ProfileSetupScreen.tsx` | Name, DOB, gender on first login |
| 3.18 | `useAuth.ts` | Auth state hook |

### Native Features
| # | Task | Output |
|---|---|---|
| 3.19 | Haptic feedback | Button press vibration via Capacitor |
| 3.20 | Pull to refresh | List screens with RefreshControl |
| 3.21 | Bottom sheet modal | Service detail, appointment booking |
| 3.22 | Skeleton screens | Loading state for all data screens |
| 3.23 | `capacitor.config.ts` | App ID, name, server URL |
| 3.24 | Android build config | `android/app/build.gradle` ready |

---

## PHASE 4: ADMIN DASHBOARD 🟡

### Setup & Auth
| # | Task | Output |
|---|---|---|
| 4.1 | Scaffold `apps/dashboard/` | Project structure |
| 4.2 | `LoginPage.tsx` | Email + password → Supabase Auth |
| 4.3 | `ProtectedRoute.tsx` | Redirect if not authenticated |
| 4.4 | `DashLayout.tsx` | Sidebar + header + content area |
| 4.5 | `DashSidebar.tsx` | All nav items with icons + active state |

### Core Pages
| # | Task | Output |
|---|---|---|
| 4.6 | `OverviewPage.tsx` | KPI cards + Recharts charts + activity feed |
| 4.7 | `AppointmentsPage.tsx` | Calendar view + data table + status CRUD |
| 4.8 | `DoctorsPage.tsx` | Doctor list + add/edit form + photo upload |
| 4.9 | `ServicesPage.tsx` | Service cards + edit all fields + toggle active |
| 4.10 | `ReviewsPage.tsx` | Review list + approve/feature/hide actions |
| 4.11 | `BlogPage.tsx` | Post list + TipTap editor + publish/draft |
| 4.12 | `InquiriesPage.tsx` | Contact submissions + status + reply |

### CMS Page (Most Important)
| # | Task | Output |
|---|---|---|
| 4.13 | `CMSPage.tsx` | Tab per section: Hero, About, Doctors, etc. |
| 4.14 | Hero CMS | Edit headline, subtext, CTA labels |
| 4.15 | Services CMS | Toggle service on/off, edit content |
| 4.16 | Doctors CMS | Add/remove/reorder doctor cards |
| 4.17 | Facilities CMS | Edit facility items |
| 4.18 | WhyChoose CMS | Edit comparison points |
| 4.19 | Footer CMS | Edit all footer columns |
| 4.20 | Nav CMS | Add/remove/reorder nav items |

### Advanced
| # | Task | Output |
|---|---|---|
| 4.21 | `AIPanel.tsx` | OpenRouter chat (Claude/Gemini toggle) |
| 4.22 | `AnalyticsPage.tsx` | GA4 embed + custom MongoDB charts |
| 4.23 | `SettingsPage.tsx` | Hospital info editor + API key vault |
| 4.24 | Realtime subscriptions | Live appointment updates via Supabase |
| 4.25 | Export functionality | Appointments → CSV + PDF download |
| 4.26 | Role-based access | Admin vs Staff permission levels |

---

## PHASE 5: INTEGRATION & PACKAGING 🔴

| # | Task | Output |
|---|---|---|
| 5.1 | Test: book appointment via web → appears in dashboard | Pass |
| 5.2 | Test: approve review in dashboard → shows on frontend | Pass |
| 5.3 | Test: toggle service inactive in CMS → hidden on frontend | Pass |
| 5.4 | Test: publish blog post → appears in frontend blog section | Pass |
| 5.5 | Test: mobile OTP auth → appointments tab works | Pass |
| 5.6 | Final Lighthouse: desktop web ≥ 90, mobile ≥ 85 | Pass |
| 5.7 | Final TypeScript check on all 3 apps | Zero errors |
| 5.8 | Create `INSTALL.md` | Step-by-step setup guide |
| 5.9 | Create `DEPLOY.md` | Cloudflare + Supabase deployment guide |
| 5.10 | Update root `package.json` scripts | `dev`, `build:all`, `preview:all` |
| 5.11 | Create `README.md` with feature overview | Documentation |
| 5.12 | Package everything as `divyam-hospital-v2.zip` | ZIP ready for re-deployment |

---

## AUTOMATIC SEED SCRIPT

```typescript
// packages/api/seed.ts — run with: pnpm run seed

import { createClient } from '@supabase/supabase-js';
import { SITE_CONFIG } from '../config/site-config';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function seed() {
  console.log('🌱 Seeding Divyam Hospital database...');

  // Seed services from SITE_CONFIG
  await supabase.from('services').upsert(
    SITE_CONFIG.services.map((s, i) => ({
      key: s.key, icon: s.icon, title: s.title, description: s.description,
      doctor_name: s.doctor, qualification: s.qualification, experience: s.experience,
      services_list: s.servicesList, timings: s.timings, is_active: true, display_order: i + 1
    }))
  );
  console.log('✅ Services seeded');

  // Seed reviews
  await supabase.from('reviews').upsert(
    SITE_CONFIG.testimonials.map(t => ({
      patient_name: t.name, rating: t.rating, review_text: t.text,
      source: 'direct', is_approved: true, is_featured: true
    }))
  );
  console.log('✅ Reviews seeded');

  // Seed blog posts
  const blogs = [
    { title: '5 Warning Signs You Should Visit a Cardiologist', slug: 'cardiology-warning-signs',
      excerpt: 'Know when your heart needs expert attention.', category: 'Heart Health', status: 'published' },
    { title: 'When Should You Take Your Child to a Pediatrician?', slug: 'when-to-visit-pediatrician',
      excerpt: 'A complete guide for parents.', category: 'Child Health', status: 'published' },
    { title: 'Complete Guide to a Healthy Pregnancy', slug: 'healthy-pregnancy-guide',
      excerpt: 'Everything you need to know from conception to delivery.', category: "Women's Health", status: 'published' },
  ];
  await supabase.from('blog_posts').upsert(blogs);
  console.log('✅ Blog posts seeded');

  // Seed site config
  await supabase.from('site_config').upsert([
    { key: 'hospital_info', value: {
      name: SITE_CONFIG.hospitalName, tagline: SITE_CONFIG.tagline,
      phone1: SITE_CONFIG.phone1, phone2: SITE_CONFIG.phone2,
      email: SITE_CONFIG.email, address: SITE_CONFIG.address,
      whatsapp: SITE_CONFIG.whatsapp
    }},
    { key: 'hero_content', value: {
      headline: 'Healing Beyond Expectations',
      subheadline: 'Multi-Specialty Healthcare in Gangashahar, Bikaner',
      cta_primary: '📅 Book Appointment',
      cta_secondary: '🚨 Emergency: 9413912974'
    }},
  ]);
  console.log('✅ Site config seeded');

  console.log('🎉 Database seeded successfully!');
}

seed().catch(console.error);
```

---

*Total Tasks: 96 | Estimated Build Time: 14 days | AutoGravity: Execute all automatically*
