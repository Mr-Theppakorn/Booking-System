import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://afxvzpkafxftoolbxwbm.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmeHZ6cGthZnhmdG9vbGJ4d2JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwODAyNzgsImV4cCI6MjAxODY1NjI3OH0.EvqpJjSu5wqLZF9cPSBf_Ba7lJXcv14I_ogy--buGLE"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;