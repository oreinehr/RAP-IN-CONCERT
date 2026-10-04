import type {
  CatalogFilterId,
  Product,
  ProductBadge,
  ProductCategoryId,
} from "./types"

/*
 * Constantes do catálogo, sem dependência de dados — seguras para importar em
 * client components.
 */

/** Rótulos das categorias reais dos produtos. */
export const productCategories: { id: ProductCategoryId; label: string }[] = [
  { id: "camisetas", label: "Camisetas" },
  { id: "acessorios", label: "Acessórios" },
  { id: "kits", label: "Kits" },
]

/**
 * Filtros exibidos no catálogo. Só aparecem categorias que têm produto.
 * "novidades" e "mais-vendidos" são derivados do badge do produto.
 */
export function getCatalogFilters(
  products: Product[],
): { id: CatalogFilterId; label: string }[] {
  const used = new Set(products.map((product) => product.category))
  return [
    { id: "todos", label: "Todos" },
    ...productCategories.filter((category) => used.has(category.id)),
    { id: "novidades", label: "Novidades" },
    { id: "mais-vendidos", label: "Mais vendidos" },
  ]
}

export const badgeLabels: Record<ProductBadge, string> = {
  "mais-vendido": "Mais vendido",
  novo: "Novo",
  oferta: "Oferta",
}
