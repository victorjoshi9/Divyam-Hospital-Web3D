export interface Service {
  id?: string;
  key: string;
  icon: string;
  title: string;
  description: string;
  doctor_name: string;
  qualification: string;
  experience: string;
  services_list: string[];
  timings: string;
  spline_url?: string;
  is_active: boolean;
  display_order: number;
}

export interface Doctor {
  id?: string;
  name: string;
  slug: string;
  specialty: string;
  qualification: string;
  experience_years: number;
  bio: string;
  photo_url?: string;
  schedule?: Record<string, string[]>;
  is_active: boolean;
  display_order: number;
}

export interface Review {
  id?: string;
  patient_name: string;
  rating: number;
  review_text: string;
  source: string;
  is_approved: boolean;
  is_featured: boolean;
  created_at?: string;
}

export interface Appointment {
  id?: string;
  patient_name: string;
  phone: string;
  department: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at?: string;
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
}
