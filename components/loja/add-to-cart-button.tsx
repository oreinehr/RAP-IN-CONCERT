"use client"

import { useEffect, useRef, useState } from "react"
import { Check, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/loja/cart-context"
import type { Product } from "@/lib/loja/types"
import { cn } from "@/lib/utils"

type AddToCartButtonProps = {
  product: Product
  quantity?: number
  variant?: Record<string, string>
  className?: string
  size?: "default" | "lg"
  label?: string
  /** Abre o carrinho logo após adicionar (usado na página de produto). */
  openCartOnAdd?: boolean
}

export default function AddToCartButton({
  product,
  quantity = 1,
  variant,
  className,
  size = "default",
  label = "Comprar",
  openCartOnAdd = false,
}: AddToCartButtonProps) {
  const { addItem, openCart } = useCart()
  const [added, setAdded] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [])

  function handleClick() {
    addItem(product, { quantity, variant })
    setAdded(true)
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setAdded(false), 1600)
    if (openCartOnAdd) openCart()
  }

  if (!product.available) {
    return (
      <Button
        type="button"
        variant="outline"
        disabled
        className={cn(
          "w-full rounded-lg border-border font-semibold",
          size === "lg" ? "h-12 text-base" : "h-10 text-sm",
          className,
        )}
      >
        Indisponível
      </Button>
    )
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      aria-label={`${label}: ${product.name}`}
      className={cn(
        "w-full rounded-lg font-semibold transition-colors duration-300",
        size === "lg" ? "h-12 text-base" : "h-10 text-sm",
        added
          ? "bg-accent text-black hover:bg-accent"
          : "bg-white text-black hover:bg-gray-200",
        className,
      )}
    >
      {added ? (
        <>
          <Check aria-hidden="true" />
          Adicionado
        </>
      ) : (
        <>
          <ShoppingBag aria-hidden="true" />
          {label}
        </>
      )}
      <span className="sr-only" role="status">
        {added ? `${product.name} adicionado ao carrinho` : ""}
      </span>
    </Button>
  )
}
