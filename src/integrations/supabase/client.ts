// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zlfsogfokkrktopwizog.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsZnNvZ2Zva2tya3RvcHdpem9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NDg0MzIsImV4cCI6MjA2NDMyNDQzMn0.d8Ev-QgwBu0A-Fk9Zmbnw69ooC8_gT9PRxBMZQJN80E";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);