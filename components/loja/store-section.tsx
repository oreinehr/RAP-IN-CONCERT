import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedProducts } from "@/lib/loja/products"
import ProductCard from "./product-card"

/**
 * Destaques da loja exibidos na home. Reutiliza o mesmo card do catálogo,
 * então qualquer ajuste no produto se propaga para as duas telas.
 */
export default async function StoreSection() {
  const products = await getFeaturedProducts(4)
  if (products.length === 0) return null

  return (
    <section id="loja" className="bg-background py-16">
      <div className="site-container">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-4xl text-white md:text-7xl">
              Loja
            </h2>
            <p className="mt-3 max-w-xl text-base text-gray-300 md:text-lg">
              Camisetas, acessórios e kits oficiais do espetáculo.
            </p>
          </div>

          <Link
            href="/loja"
            className="inline-flex items-center gap-2 self-start rounded-lg border border-white/25 px-5 py-2.5 text-sm font-normal text-white transition-colors hover:border-white/60 hover:bg-white/5 sm:text-base"
          >
            Ver toda a loja
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
