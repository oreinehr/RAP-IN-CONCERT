import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { supabaseKey, supabaseUrl } from "./env"

/** Cliente com a sessão do usuário logado (Server Components e Server Actions). */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // Chamado de um Server Component: o proxy já renova a sessão.
        }
      },
    },
  })
}

/** Usuário logado que está na tabela `admins`, ou null. */
export async function getAdminUser() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: isAdmin } = await supabase.rpc("is_admin")
  return isAdmin ? user : null
}
