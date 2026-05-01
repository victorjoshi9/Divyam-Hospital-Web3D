import { createClient } from '@supabase/supabase-js';

declare global {
  interface ImportMeta {
    env: Record<string, string>;
  }
}

const SUPABASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  'https://muquspgkgwnmiwasnrrk.supabase.co';

const SUPABASE_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  'sb_publishable_hXHu34reMwgBl4B7vCWOsg_Ymli94OQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
