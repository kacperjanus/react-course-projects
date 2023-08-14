import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nfyipzromfvdtbcveygq.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5meWlwenJvbWZ2ZHRiY3ZleWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE4NzAyNTQsImV4cCI6MjAwNzQ0NjI1NH0.0G5bpn6knaY8hkgzLrv22ITmMRz2sf6uqIJsmiE6b3k";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
