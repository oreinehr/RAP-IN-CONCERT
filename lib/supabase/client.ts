import { createBrowserClient } from "@supabase/ssr"
import { supabaseKey, supabaseUrl } from "./env"

export function createSupabaseBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseKey)
}
