// Cria (ou promove) um usuário administrador da loja.
// Uso: node --env-file=.env.local scripts/create-admin.mjs email@exemplo.com "senha-forte"
import { createClient } from "@supabase/supabase-js"

const [email, password] = process.argv.slice(2)
if (!email || !password) {
  console.error('Uso: node --env-file=.env.local scripts/create-admin.mjs email "senha"')
  process.exit(1)
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
)

let userId
const { data: created, error: createError } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
})

if (created?.user) {
  userId = created.user.id
} else {
  // Usuário já existe: localiza e atualiza a senha.
  const { data: list, error: listError } = await supabase.auth.admin.listUsers({ perPage: 1000 })
  if (listError) throw listError
  const existing = list.users.find((user) => user.email?.toLowerCase() === email.toLowerCase())
  if (!existing) throw createError
  userId = existing.id
  const { error } = await supabase.auth.admin.updateUserById(userId, { password })
  if (error) throw error
}

const { error } = await supabase.from("admins").upsert({ user_id: userId })
if (error) throw error

console.log(`✓ ${email} agora é administrador da loja`)
