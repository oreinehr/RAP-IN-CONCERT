import { notFound } from "next/navigation"
import ProductForm from "@/components/admin/product-form"
import type { ProductRow } from "@/lib/loja/products"
import type { ProductFormValues } from "@/lib/loja/product-schema"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle()
  if (!data) notFound()

  const row = data as ProductRow
  const initial: ProductFormValues = {
    name: row.name,
    slug: row.slug,
    category: row.category,
    price: Number(row.price),
    oldPrice: row.old_price != null ? Number(row.old_price) : null,
    installment: row.installment,
    badge: row.badge,
    rating: Number(row.rating),
    reviews: row.reviews,
    available: row.available,
    published: row.published,
    description: row.description,
    image: row.image,
    images: row.images,
    options: row.options,
    position: row.position,
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Editar produto</h1>
      <ProductForm productId={row.id} initial={initial} nextPosition={row.position} />
    </>
  )
}
