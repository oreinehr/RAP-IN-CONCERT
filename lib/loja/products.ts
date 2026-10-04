import type {
  CatalogFilterId,
  Product,
  ProductBadge,
  ProductCategoryId,
} from "./types"

/** Rótulos das categorias reais dos produtos. */
export const productCategories: { id: ProductCategoryId; label: string }[] = [
  { id: "camisetas", label: "Camisetas" },
]

/**
 * Filtros exibidos no catálogo. "novidades" e "mais-vendidos" são derivados do
 * badge do produto — não são categorias, então continuam válidos mesmo que a
 * lista de categorias mude.
 */
export const catalogFilters: { id: CatalogFilterId; label: string }[] = [
  { id: "todos", label: "Todos" },
  ...productCategories,
  { id: "novidades", label: "Novidades" },
  { id: "mais-vendidos", label: "Mais vendidos" },
]

export const badgeLabels: Record<ProductBadge, string> = {
  "mais-vendido": "Mais vendido",
  novo: "Novo",
  oferta: "Oferta",
}

const TAMANHOS = { name: "Tamanho", values: ["P", "M", "G", "GG"] }

/**
 * Produtos fictícios para demonstração.
 * Para conectar uma API/CMS depois, basta trocar o corpo de `getProducts()`.
 */
const products: Product[] = [
  {
    id: "1",
    name: "Camiseta Rap in Concert",
    slug: "camiseta-rap-in-concert",
    image: "/loja/branca-selecao.png",
    price: 89.9,
    oldPrice: 119.9,
    category: "camisetas",
    rating: 4.9,
    reviews: 128,
    badge: "mais-vendido",
    available: true,
    options: [TAMANHOS],
    description:
      "Camiseta oficial do espetáculo, em algodão penteado 30.1 com gramatura pesada. Estampa em silk de alta durabilidade com o logo do Rap in Concert. Modelagem unissex.",
  },
  {
    id: "2",
    name: "Camiseta O Rap Vive!",
    slug: "camiseta-o-rap-vive",
    image: "/loja/branca-selecao.png",
    price: 89.9,
    category: "camisetas",
    rating: 4.8,
    reviews: 64,
    badge: "novo",
    available: true,
    options: [TAMANHOS],
    description:
      "O manifesto do projeto estampado no peito. Algodão penteado, corte reto e estampa frontal em branco sobre preto.",
  },
  {
    id: "3",
    name: "Camiseta Nada Pode Nos Parar",
    slug: "camiseta-nada-pode-nos-parar",
    image: "/loja/branca-selecao.png",
    price: 89.9,
    oldPrice: 109.9,
    category: "camisetas",
    rating: 5,
    reviews: 41,
    badge: "oferta",
    available: true,
    options: [TAMANHOS],
    description:
      "Camiseta da 3ª edição, com a frase que batizou o espetáculo estampada nas costas. Algodão penteado 30.1 e modelagem unissex.",
  },
  {
    id: "4",
    name: "Camiseta 4 Elementos",
    slug: "camiseta-4-elementos",
    image: "/loja/branca-selecao.png",
    price: 89.9,
    category: "camisetas",
    rating: 4.8,
    reviews: 37,
    available: true,
    options: [TAMANHOS],
    description:
      "Homenagem aos quatro elementos do hip hop — MC, DJ, breaking e grafite — em estampa frontal. Algodão penteado, corte reto.",
  },
]

/* -------------------------------------------------------------------------- */
/* Acesso aos dados — único ponto a trocar por API / CMS / e-commerce          */
/* -------------------------------------------------------------------------- */

export async function getProducts(): Promise<Product[]> {
  return products
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((product) => product.slug === slug) ?? null
}

export async function getFeaturedProducts(limit = 3): Promise<Product[]> {
  return products.filter((product) => product.available).slice(0, limit)
}

export async function getRelatedProducts(
  product: Product,
  limit = 3,
): Promise<Product[]> {
  const sameCategory = products.filter(
    (item) => item.id !== product.id && item.category === product.category,
  )
  const rest = products.filter(
    (item) => item.id !== product.id && item.category !== product.category,
  )
  return [...sameCategory, ...rest].slice(0, limit)
}

export async function getProductSlugs(): Promise<string[]> {
  return products.map((product) => product.slug)
}
