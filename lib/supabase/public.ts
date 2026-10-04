import { createClient } from "@supabase/supabase-js"
import { supabaseKey, supabaseUrl } from "./env"

/**
 * Cliente anônimo, sem cookies — para leituras públicas da loja.
 * Não depender de cookies mantém /loja estática (revalidada pelo CMS).
 */
export function createPublicClient() {
  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
