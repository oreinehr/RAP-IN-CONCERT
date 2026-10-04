import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProductCard from "@/components/loja/product-card"
import ProductRating from "@/components/loja/product-rating"
import ProductPurchasePanel from "@/components/loja/product-purchase-panel"
import {
  badgeLabels,
  getProductBySlug,
  getProductSlugs,
  getRelatedProducts,
  productCategories,
} from "@/lib/loja/products"
import {
  discountPercent,
  formatInstallment,
  formatPrice,
} from "@/lib/loja/format"

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getProductSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: "Produto não encontrado | RAP IN CONCERT" }

  return {
    title: `${product.name} | Loja RAP IN CONCERT`,
    description: product.description,
  }
}

export default async function ProdutoPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product, 4)
  const discount = discountPercent(product.price, product.oldPrice)
  const installment = product.installment ?? formatInstallment(product.price)
  const categoryLabel = productCategories.find(
    (category) => category.id === product.category,
  )?.label

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pb-20 pt-28 md:pt-32">
        <div className="site-container">
          <Link
            href="/loja"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar para a loja
          </Link>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Imagem */}
            <div className="relative aspect-square overflow-hidden border border-border bg-card">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={product.available ? "object-cover" : "object-cover grayscale"}
              />
              {product.badge && product.available && (
                <span className="absolute left-4 top-4 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-black">
                  {badgeLabels[product.badge]}
                </span>
              )}
            </div>

            {/* Informações */}
            <div className="flex flex-col gap-6">
              <div>
                {categoryLabel && (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {categoryLabel}
                  </p>
                )}
                <h1 className="font-display text-4xl leading-tight text-white md:text-6xl">
                  {product.name}
                </h1>
                <ProductRating
                  rating={product.rating}
                  reviews={product.reviews}
                  size="md"
                  className="mt-4"
                />
              </div>

              <div>
                {product.oldPrice && (
                  <p className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                    {discount && (
                      <span className="rounded-lg bg-accent px-2 py-0.5 text-xs font-semibold text-black">
                        -{discount}%
                      </span>
                    )}
                  </p>
                )}
                <p className="text-4xl font-black text-white md:text-5xl">
                  {formatPrice(product.price)}
                </p>
                <p className="mt-2 text-sm text-gray-400">{installment}</p>
              </div>

              {product.description && (
                <p className="max-w-xl leading-relaxed text-gray-300">
                  {product.description}
                </p>
              )}

              {product.available ? (
                <ProductPurchasePanel product={product} />
              ) : (
                <div className="border border-border bg-card px-5 py-4">
                  <p className="font-semibold text-white">Produto esgotado</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Fale com a gente pelo WhatsApp para saber da próxima leva.
                  </p>
                </div>
              )}
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="mb-8 font-display text-3xl text-white md:text-5xl">
                Quem levou, levou também
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {related.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
