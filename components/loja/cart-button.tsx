"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/loja/cart-context"
import { cn } from "@/lib/utils"

export default function CartButton({ className }: { className?: string }) {
  const { itemCount, openCart } = useCart()

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Abrir carrinho${itemCount ? `, ${itemCount} itens` : ", vazio"}`}
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-lg text-gray-300 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <ShoppingBag className="size-5" aria-hidden="true" />
      {itemCount > 0 && (
        <span
          className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-lg bg-accent px-1 text-[11px] font-bold text-black transition-transform duration-300"
          key={itemCount}
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
      <span className="sr-only" role="status" aria-live="polite">
        {itemCount} itens no carrinho
      </span>
    </button>
  )
}
