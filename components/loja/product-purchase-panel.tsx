"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import type { Product } from "@/lib/loja/types"
import { cn } from "@/lib/utils"
import AddToCartButton from "./add-to-cart-button"

/** Seleção de variações + quantidade. Isolado para manter a página como Server Component. */
export default function ProductPurchasePanel({ product }: { product: Product }) {
  const [variant, setVariant] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      (product.options ?? []).map((option) => [option.name, option.values[0]]),
    ),
  )
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="flex flex-col gap-6">
      {product.options?.map((option) => (
        <fieldset key={option.name}>
          <legend className="mb-3 text-sm font-semibold text-white">
            {option.name}
          </legend>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const active = variant[option.name] === value
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setVariant((current) => ({ ...current, [option.name]: value }))
                  }
                  className={cn(
                    "min-w-12 rounded-lg border px-4 py-2 text-sm font-semibold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "border-white bg-white text-black"
                      : "border-border text-gray-300 hover:border-white/40 hover:text-white",
                  )}
                >
                  {value}
                </button>
              )
            })}
          </div>
        </fieldset>
      ))}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="inline-flex items-center self-start rounded-lg border border-border">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            aria-label="Diminuir quantidade"
            disabled={quantity <= 1}
            className="rounded-l-lg p-3 text-gray-300 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
          >
            <Minus className="size-4" aria-hidden="true" />
          </button>
          <span
            className="min-w-10 text-center text-sm font-semibold text-white"
            aria-live="polite"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(99, value + 1))}
            aria-label="Aumentar quantidade"
            className="rounded-r-lg p-3 text-gray-300 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Plus className="size-4" aria-hidden="true" />
          </button>
        </div>

        <AddToCartButton
          product={product}
          quantity={quantity}
          variant={product.options?.length ? variant : undefined}
          size="lg"
          label="Comprar agora"
          openCartOnAdd
          className="sm:flex-1"
        />
      </div>
    </div>
  )
}
