import type {
  CatalogFilterId,
  PriceRangeId,
  Product,
  SortId,
} from "./types"

export const sortOptions: { id: SortId; label: string }[] = [
  { id: "relevancia", label: "Relevância" },
  { id: "menor-preco", label: "Menor preço" },
  { id: "maior-preco", label: "Maior preço" },
  { id: "avaliacao", label: "Melhor avaliados" },
]

export const priceRanges: {
  id: PriceRangeId
  label: string
  min: number
  max: number
}[] = [
  { id: "qualquer", label: "Qualquer preço", min: 0, max: Infinity },
  { id: "ate-100", label: "Até R$ 100", min: 0, max: 100 },
  { id: "100-200", label: "R$ 100 a R$ 200", min: 100, max: 200 },
  { id: "acima-200", label: "Acima de R$ 200", min: 200, max: Infinity },
]

function matchesFilter(product: Product, filter: CatalogFilterId) {
  switch (filter) {
    case "todos":
      return true
    case "novidades":
      return product.badge === "novo"
    case "mais-vendidos":
      return product.badge === "mais-vendido"
    default:
      return product.category === filter
  }
}

function matchesPrice(product: Product, rangeId: PriceRangeId) {
  const range = priceRanges.find((item) => item.id === rangeId)
  if (!range) return true
  return product.price >= range.min && product.price <= range.max
}

/** Produtos indisponíveis vão sempre para o fim, mantendo o grid limpo. */
function byAvailability(a: Product, b: Product) {
  return Number(b.available) - Number(a.available)
}

export function filterAndSortProducts(
  products: Product[],
  {
    filter,
    priceRange,
    sort,
  }: { filter: CatalogFilterId; priceRange: PriceRangeId; sort: SortId },
) {
  const filtered = products.filter(
    (product) => matchesFilter(product, filter) && matchesPrice(product, priceRange),
  )

  const sorters: Record<SortId, (a: Product, b: Product) => number> = {
    relevancia: (a, b) => byAvailability(a, b) || Number(a.id) - Number(b.id),
    "menor-preco": (a, b) => byAvailability(a, b) || a.price - b.price,
    "maior-preco": (a, b) => byAvailability(a, b) || b.price - a.price,
    avaliacao: (a, b) => byAvailability(a, b) || b.rating - a.rating,
  }

  return [...filtered].sort(sorters[sort])
}
