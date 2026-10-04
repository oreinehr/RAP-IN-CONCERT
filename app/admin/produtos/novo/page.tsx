import ProductForm from "@/components/admin/product-form"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function NovoProdutoPage() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from("products")
    .select("position")
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle()

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Novo produto</h1>
      <ProductForm productId={null} nextPosition={(data?.position ?? 0) + 1} />
    </>
  )
}
