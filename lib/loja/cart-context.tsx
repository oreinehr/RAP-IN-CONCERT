"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { Product } from "./types"

const STORAGE_KEY = "ric-carrinho-v1"

export type CartItem = {
  /** Chave única: produto + variação escolhida. */
  key: string
  productId: string
  slug: string
  name: string
  image: string
  price: number
  quantity: number
  variant?: Record<string, string>
}

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (
    product: Product,
    options?: { quantity?: number; variant?: Record<string, string> },
  ) => void
  setQuantity: (key: string, quantity: number) => void
  removeItem: (key: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function buildKey(productId: string, variant?: Record<string, string>) {
  const signature = variant
    ? Object.keys(variant)
        .sort()
        .map((name) => `${name}:${variant[name]}`)
        .join("|")
    : ""
  return signature ? `${productId}__${signature}` : productId
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Restaura o carrinho salvo apenas no cliente, evitando divergência de SSR.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored) as CartItem[])
    } catch {
      // localStorage indisponível (modo privativo, etc.) — segue com carrinho vazio.
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Persistência é opcional: falhar aqui não pode quebrar a loja.
    }
  }, [items, hydrated])

  const addItem = useCallback<CartContextValue["addItem"]>(
    (product, { quantity = 1, variant } = {}) => {
      if (!product.available) return
      const key = buildKey(product.id, variant)

      setItems((current) => {
        const existing = current.find((item) => item.key === key)
        if (existing) {
          return current.map((item) =>
            item.key === key
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        }
        return [
          ...current,
          {
            key,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity,
            variant,
          },
        ]
      })
    },
    [],
  )

  const setQuantity = useCallback<CartContextValue["setQuantity"]>(
    (key, quantity) => {
      setItems((current) =>
        quantity <= 0
          ? current.filter((item) => item.key !== key)
          : current.map((item) =>
              item.key === key ? { ...item, quantity } : item,
            ),
      )
    },
    [],
  )

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((item) => item.key !== key))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0)
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    )
    return {
      items,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }
  }, [
    items,
    isOpen,
    openCart,
    closeCart,
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  ])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart precisa estar dentro de <CartProvider>")
  }
  return context
}
