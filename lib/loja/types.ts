/**
 * Tipos da loja.
 *
 * A camada de dados é separada da UI: os produtos vêm do Supabase via
 * `lib/loja/products.ts` (cadastrados no CMS em /admin/produtos) e são
 * convertidos para este formato antes de chegar aos componentes.
 */

export type ProductCategoryId = "camisetas" | "acessorios" | "kits"

export type ProductBadge = "mais-vendido" | "novo" | "oferta"

/** Variação do produto (ex.: Tamanho -> P, M, G, GG). */
export type ProductOption = {
  name: string
  values: string[]
}

export type Product = {
  id: string
  name: string
  slug: string
  image: string
  /** Imagens adicionais para a página de detalhe. Opcional. */
  images?: string[]
  price: number
  oldPrice?: number
  /** Texto de parcelamento. Se ausente, é calculado por `formatInstallment`. */
  installment?: string
  category: ProductCategoryId
  /** 0 a 5. */
  rating: number
  reviews?: number
  badge?: ProductBadge
  available: boolean
  description?: string
  options?: ProductOption[]
}

/** Filtros da navegação do catálogo (categorias reais + filtros derivados). */
export type CatalogFilterId =
  | "todos"
  | ProductCategoryId
  | "novidades"
  | "mais-vendidos"

export type SortId = "relevancia" | "menor-preco" | "maior-preco" | "avaliacao"

export type PriceRangeId = "qualquer" | "ate-100" | "100-200" | "acima-200"
