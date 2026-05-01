// packages/api/seed.ts
import { createClient } from '@supabase/supabase-js';
import { SITE_CONFIG } from '../config/site-config';

// Load environment variables if running locally via tsx/dotenv
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Cannot seed database.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('🌱 Seeding Divyam Hospital database...');

  // Seed services from SITE_CONFIG
  const { error: serviceError } = await supabase.from('services').upsert(
    SITE_CONFIG.services.map((s, i) => ({
      key: s.key, icon: s.icon, title: s.title, description: s.description,
      doctor_name: s.doctor, qualification: s.qualification, experience: s.experience,
      services_list: s.servicesList, timings: s.timings, is_active: true, display_order: i + 1
    }))
  );
  if (serviceError) console.error("Error seeding services:", serviceError);
  else console.log('✅ Services seeded');

  // Seed reviews
  const { error: reviewError } = await supabase.from('reviews').upsert(
    SITE_CONFIG.testimonials.map(t => ({
      patient_name: t.name, rating: t.rating, review_text: t.text,
      source: 'direct', is_approved: true, is_featured: true
    }))
  );
  if (reviewError) console.error("Error seeding reviews:", reviewError);
  else console.log('✅ Reviews seeded');

  // Seed blog posts
  const blogs = [
    { title: '5 Warning Signs You Should Visit a Cardiologist', slug: 'cardiology-warning-signs',
      excerpt: 'Know when your heart needs expert attention.', category: 'Heart Health', status: 'published' },
    { title: 'When Should You Take Your Child to a Pediatrician?', slug: 'when-to-visit-pediatrician',
      excerpt: 'A complete guide for parents.', category: 'Child Health', status: 'published' },
    { title: 'Complete Guide to a Healthy Pregnancy', slug: 'healthy-pregnancy-guide',
      excerpt: 'Everything you need to know from conception to delivery.', category: "Women's Health", status: 'published' },
  ];
  const { error: blogError } = await supabase.from('blog_posts').upsert(blogs);
  if (blogError) console.error("Error seeding blog posts:", blogError);
  else console.log('✅ Blog posts seeded');

  // Seed site config
  const { error: configError } = await supabase.from('site_config').upsert([
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
  if (configError) console.error("Error seeding site_config:", configError);
  else console.log('✅ Site config seeded');

  console.log('🎉 Database seeded successfully!');
}

seed().catch(console.error);
