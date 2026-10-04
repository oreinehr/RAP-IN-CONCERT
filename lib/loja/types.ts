/**
 * Tipos da loja.
 *
 * A camada de dados é intencionalmente separada da UI: hoje os produtos vêm de
 * `lib/loja/products.ts` (mock), mas qualquer fonte (API, CMS, Shopify, Mongo)
 * só precisa devolver objetos neste formato para a loja continuar funcionando.
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
