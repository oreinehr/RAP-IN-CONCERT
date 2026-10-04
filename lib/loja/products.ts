import { cache } from "react"
import { createPublicClient } from "@/lib/supabase/public"
import type {
  Product,
  ProductBadge,
  ProductCategoryId,
  ProductOption,
} from "./types"

export { badgeLabels, getCatalogFilters, productCategories } from "./catalog"

/* -------------------------------------------------------------------------- */
/* Supabase                                                                    */
/* -------------------------------------------------------------------------- */

/** Linha da tabela `products` (snake_case, como vem do Postgres). */
export type ProductRow = {
  id: string
  name: string
  slug: string
  image: string
  images: string[]
  price: number
  old_price: number | null
  installment: string | null
  category: ProductCategoryId
  rating: number
  reviews: number
  badge: ProductBadge | null
  available: boolean
  published: boolean
  description: string | null
  options: ProductOption[]
  position: number
  created_at: string
  updated_at: string
}

export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    image: row.image,
    images: row.images.length > 0 ? row.images : undefined,
    price: Number(row.price),
    oldPrice: row.old_price != null ? Number(row.old_price) : undefined,
    installment: row.installment ?? undefined,
    category: row.category,
    rating: Number(row.rating),
    reviews: row.reviews,
    badge: row.badge ?? undefined,
    available: row.available,
    description: row.description ?? undefined,
    options: row.options.length > 0 ? row.options : undefined,
  }
}

/* -------------------------------------------------------------------------- */
/* Acesso aos dados — só produtos publicados (RLS garante isso para anon)      */
/* -------------------------------------------------------------------------- */

export const getProducts = cache(async (): Promise<Product[]> => {
  const { data, error } = await createPublicClient()
    .from("products")
    .select("*")
    .eq("published", true)
    .order("position")
    .order("created_at")

  if (error) throw new Error(`Erro ao carregar produtos: ${error.message}`)
  return (data as ProductRow[]).map(rowToProduct)
})

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts()
  return products.find((product) => product.slug === slug) ?? null
}

export async function getFeaturedProducts(limit = 3): Promise<Product[]> {
  const products = await getProducts()
  return products.filter((product) => product.available).slice(0, limit)
}

export async function getRelatedProducts(
  product: Product,
  limit = 3,
): Promise<Product[]> {
  const products = await getProducts()
  const sameCategory = products.filter(
    (item) => item.id !== product.id && item.category === product.category,
  )
  const rest = products.filter(
    (item) => item.id !== product.id && item.category !== product.category,
  )
  return [...sameCategory, ...rest].slice(0, limit)
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await getProducts()
  return products.map((product) => product.slug)
}
