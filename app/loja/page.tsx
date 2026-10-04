import { Suspense } from "react"
import type { Metadata } from "next"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import StoreHeader from "@/components/loja/store-header"
import StoreCatalog from "@/components/loja/store-catalog"
import ProductGridSkeleton from "@/components/loja/product-card-skeleton"
import { getProducts } from "@/lib/loja/products"

export const metadata: Metadata = {
  title: "Loja Oficial | RAP IN CONCERT",
  description:
    "Camisetas, acessórios e kits oficiais do Rap in Concert. Vista o movimento.",
}

async function Catalog() {
  const products = await getProducts()
  return <StoreCatalog products={products} />
}

export default function LojaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pb-16 pt-28 md:pt-32">
        <div className="site-container">
          <StoreHeader />
          <Suspense fallback={<ProductGridSkeleton count={8} />}>
            <Catalog />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  )
}
