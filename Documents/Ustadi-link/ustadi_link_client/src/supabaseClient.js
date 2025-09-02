import { createClient } from '@supabase/supabase-js';

// These are the credentials you provided
const supabaseUrl = 'https://vzjiofawemdoojjlopmt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6amlvZmF3ZW1kb29qamxvcG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MTE0NzgsImV4cCI6MjA3MjI4NzQ3OH0.Q7Zf4lnjOoDZo6inxzR8xQb-lcM-Anoj_UU-AA6E0aE';

// This exports the configured client for the rest of our app to use
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
