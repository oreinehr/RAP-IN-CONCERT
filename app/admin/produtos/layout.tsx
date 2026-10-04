import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { signOut } from "./actions"

export const metadata: Metadata = {
  title: "Produtos | Painel RAP IN CONCERT",
  robots: { index: false, follow: false },
}

export default async function AdminProdutosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { data: isAdmin } = await supabase.rpc("is_admin")

  return (
    <div className="min-h-screen bg-background text-white">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
          <Link href="/admin/produtos" className="flex items-center gap-3">
            <Image
              src="/logo-ric.png"
              width={303}
              height={194}
              alt="Rap in Concert"
              className="h-9 w-auto object-contain invert"
            />
            <span className="hidden text-sm font-semibold text-gray-300 sm:inline">
              Produtos
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/loja"
              target="_blank"
              className="text-sm text-gray-300 transition-colors hover:text-white"
            >
              Ver loja
            </Link>
            <span className="hidden max-w-[180px] truncate text-xs text-muted-foreground md:inline">
              {user.email}
            </span>
            <form action={signOut}>
              <Button type="submit" variant="outline" size="sm">
                Sair
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        {isAdmin ? (
          children
        ) : (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-lg font-semibold">Sem permissão</p>
            <p className="mt-2 text-sm text-muted-foreground">
              A conta {user.email} não é administradora da loja.
            </p>
          </div>
        )}
      </main>

      <Toaster theme="dark" position="bottom-right" />
    </div>
  )
}
