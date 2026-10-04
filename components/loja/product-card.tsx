import Image from "next/image"
import Link from "next/link"
import { badgeLabels } from "@/lib/loja/catalog"
import {
  discountPercent,
  formatInstallment,
  formatPrice,
} from "@/lib/loja/format"
import type { Product } from "@/lib/loja/types"
import { cn } from "@/lib/utils"
import AddToCartButton from "./add-to-cart-button"
import ProductRating from "./product-rating"

/** Badges seguem a paleta: destaque em accent, oferta em branco. */
const badgeStyles: Record<string, string> = {
  "mais-vendido": "bg-accent text-black",
  novo: "bg-white text-black",
  oferta: "bg-accent text-black",
}

export default function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product.price, product.oldPrice)
  const installment = product.installment ?? formatInstallment(product.price)

  return (
    <article
      className={cn(
        "group flex h-full flex-col border border-border bg-card transition-colors duration-500",
        product.available ? "hover:border-white/30" : "opacity-70",
      )}
    >
      <Link
        href={`/loja/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-black outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={cn(
            "object-cover transition-transform duration-700",
            product.available ? "group-hover:scale-105" : "grayscale",
          )}
        />
        <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/10" />

        {product.badge && product.available && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-lg px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
              badgeStyles[product.badge],
            )}
          >
            {badgeLabels[product.badge]}
          </span>
        )}

        {discount && product.available && (
          <span className="absolute right-3 top-3 rounded-lg bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            -{discount}%
          </span>
        )}

        {!product.available && (
          <span className="absolute inset-x-0 bottom-0 bg-black/80 py-2 text-center text-xs font-semibold uppercase tracking-widest text-gray-300">
            Esgotado
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <ProductRating rating={product.rating} reviews={product.reviews} />

        <h3 className="font-display text-lg leading-tight text-white md:text-xl">
          <Link
            href={`/loja/${product.slug}`}
            className="line-clamp-2 min-h-[2.75rem] outline-none transition-colors hover:text-gray-300 focus-visible:text-gray-300 focus-visible:underline"
          >
            {product.name}
          </Link>
        </h3>

        <div>
          {/* Linha reservada mesmo sem preço antigo: mantém preço e botão
              alinhados entre todos os cards da grade. */}
          <p
            className={cn(
              "h-4 text-xs text-muted-foreground line-through",
              !product.oldPrice && "invisible",
            )}
            aria-hidden={!product.oldPrice}
          >
            {formatPrice(product.oldPrice ?? product.price)}
          </p>
          <p className="text-xl font-black text-white">
            {formatPrice(product.price)}
          </p>
          <p className="mt-0.5 text-[11px] text-gray-400">{installment}</p>
        </div>

        <div className="mt-auto pt-1.5">
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  )
}
