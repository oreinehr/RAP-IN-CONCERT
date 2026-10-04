"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/loja/cart-context"
import { formatPrice } from "@/lib/loja/format"

const WHATSAPP = "5551994513729"

export default function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    isOpen,
    closeCart,
    setQuantity,
    removeItem,
    clearCart,
  } = useCart()

  const orderMessage = encodeURIComponent(
    [
      "Olá! Quero fechar um pedido na loja do Rap in Concert:",
      "",
      ...items.map((item) => {
        const variant = item.variant
          ? ` (${Object.entries(item.variant)
              .map(([name, value]) => `${name}: ${value}`)
              .join(", ")})`
          : ""
        return `• ${item.quantity}x ${item.name}${variant} — ${formatPrice(
          item.price * item.quantity,
        )}`
      }),
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
    ].join("\n"),
  )

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full border-border bg-background sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-6 pb-4 pt-6">
          <SheetTitle className="font-display text-3xl font-normal text-white">
            Carrinho
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            {itemCount > 0
              ? `${itemCount} ${
                  itemCount === 1 ? "item selecionado" : "itens selecionados"
                }`
              : "Seu carrinho está vazio."}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm text-gray-400">
              Nenhum produto por aqui ainda.
            </p>
            <Button
              asChild
              className="rounded-lg bg-white font-semibold text-black hover:bg-gray-200"
            >
              <Link href="/loja" onClick={closeCart}>
                Ver produtos
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-4">
                  <Link
                    href={`/loja/${item.slug}`}
                    onClick={closeCart}
                    className="relative size-20 shrink-0 overflow-hidden border border-border bg-card"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          href={`/loja/${item.slug}`}
                          onClick={closeCart}
                          className="block truncate text-sm font-semibold text-white transition-colors hover:text-gray-300"
                        >
                          {item.name}
                        </Link>
                        {item.variant && (
                          <p className="truncate text-xs text-muted-foreground">
                            {Object.entries(item.variant)
                              .map(([name, value]) => `${name}: ${value}`)
                              .join(" · ")}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        aria-label={`Remover ${item.name} do carrinho`}
                        className="shrink-0 rounded-lg p-1.5 text-muted-foreground outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-lg border border-border">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.key, item.quantity - 1)}
                          aria-label={`Diminuir quantidade de ${item.name}`}
                          className="rounded-l-lg p-2 text-gray-300 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Minus className="size-3.5" aria-hidden="true" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.key, item.quantity + 1)}
                          aria-label={`Aumentar quantidade de ${item.name}`}
                          className="rounded-r-lg p-2 text-gray-300 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Plus className="size-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <span className="text-sm font-black text-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-6 pb-6 pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-2xl font-black text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Frete e prazo calculados na finalização.
              </p>

              <Button
                asChild
                className="mt-4 h-12 w-full rounded-lg bg-white text-base font-semibold text-black hover:bg-gray-200"
              >
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${orderMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Finalizar pedido
                </a>
              </Button>

              <button
                type="button"
                onClick={clearCart}
                className="mt-3 w-full rounded-lg py-2 text-xs text-muted-foreground outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-ring"
              >
                Esvaziar carrinho
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
