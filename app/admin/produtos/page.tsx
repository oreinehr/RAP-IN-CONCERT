import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductTable from "@/components/admin/product-table"
import { rowToProduct, type ProductRow } from "@/lib/loja/products"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function AdminProdutosPage() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("position")
    .order("created_at")

  const rows = (data ?? []) as ProductRow[]
  const products = rows.map((row) => ({
    ...rowToProduct(row),
    published: row.published,
  }))

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Produtos</h1>
          <p className="text-sm text-muted-foreground">
            {products.length} {products.length === 1 ? "produto" : "produtos"} cadastrados
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/produtos/novo">
            <Plus className="size-4" />
            Novo produto
          </Link>
        </Button>
      </div>

      {error ? (
        <p className="text-sm text-red-400">Erro ao carregar: {error.message}</p>
      ) : (
        <ProductTable products={products} />
      )}
    </>
  )
}
