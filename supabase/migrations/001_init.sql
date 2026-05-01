-- appointments
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  phone text NOT NULL,
  department text,
  preferred_date date,
  preferred_time text,
  message text,
  status text DEFAULT 'pending', -- pending|confirmed|completed|cancelled
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- doctors
CREATE TABLE doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  specialty text NOT NULL,
  qualification text,
  experience_years int,
  bio text,
  photo_url text,
  schedule jsonb, -- {mon: ["9:00","10:00",...], tue: [...]}
  is_active boolean DEFAULT true,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- services
CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL, -- pediatrics, gynecology, etc.
  icon text,
  title text NOT NULL,
  description text,
  doctor_id uuid REFERENCES doctors(id),
  services_list jsonb, -- string[]
  timings text,
  spline_url text,
  is_active boolean DEFAULT true,
  display_order int DEFAULT 0
);

-- reviews
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  rating int CHECK (rating BETWEEN 1 AND 5),
  review_text text,
  source text DEFAULT 'direct', -- direct|justdial|google
  is_approved boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- blog_posts
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  featured_image text,
  category text,
  tags text[],
  status text DEFAULT 'draft', -- draft|published|archived
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_at timestamptz DEFAULT now()
);

-- inquiries
CREATE TABLE inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text,
  email text,
  message text,
  status text DEFAULT 'new', -- new|in_progress|resolved
  created_at timestamptz DEFAULT now()
);

-- site_config
CREATE TABLE site_config (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- patients (for patient portal)
CREATE TABLE patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid, -- would reference auth.users(id) if auth was enabled in this setup script
  name text,
  phone text UNIQUE,
  date_of_birth date,
  gender text,
  blood_group text,
  address text,
  emergency_contact text,
  created_at timestamptz DEFAULT now()
);
