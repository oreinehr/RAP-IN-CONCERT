"use client"

import { useTransition } from "react"
import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { deleteProduct, setProductPublished } from "@/app/admin/produtos/actions"
import { badgeLabels, productCategories } from "@/lib/loja/catalog"
import { formatPrice } from "@/lib/loja/format"
import type { Product } from "@/lib/loja/types"

type AdminProduct = Product & { published: boolean }

export default function ProductTable({ products }: { products: AdminProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card px-6 py-16 text-center">
        <p className="font-semibold">Nenhum produto ainda</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Cadastre o primeiro em “Novo produto”.
        </p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
      {products.map((product) => (
        <ProductRowItem key={product.id} product={product} />
      ))}
    </ul>
  )
}

function ProductRowItem({ product }: { product: AdminProduct }) {
  const [pending, startTransition] = useTransition()
  const category = productCategories.find((item) => item.id === product.category)

  function togglePublished(published: boolean) {
    startTransition(async () => {
      const result = await setProductPublished(product.id, published)
      if (result?.error) toast.error(result.error)
      else toast.success(published ? "Produto publicado" : "Produto ocultado da loja")
    })
  }

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteProduct(product.id)
      if (result?.error) toast.error(result.error)
      else toast.success("Produto excluído")
    })
  }

  return (
    <li
      className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
      aria-busy={pending}
      style={{ opacity: pending ? 0.6 : 1 }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image || "/placeholder.svg"}
          alt=""
          className="size-16 shrink-0 rounded-lg bg-black object-cover"
        />
        <div className="min-w-0">
          <Link
            href={`/admin/produtos/${product.id}`}
            className="block truncate font-semibold hover:underline"
          >
            {product.name}
          </Link>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {category?.label} · {formatPrice(product.price)}
            {product.oldPrice != null && (
              <span className="ml-1 line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </p>
          <div className="mt-1 flex flex-wrap gap-1.5 text-xs">
            {product.badge && (
              <span className="rounded border border-border px-1.5 py-0.5 text-gray-300">
                {badgeLabels[product.badge]}
              </span>
            )}
            {!product.available && (
              <span className="rounded border border-red-500/40 px-1.5 py-0.5 text-red-300">
                Esgotado
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <Switch
            checked={product.published}
            onCheckedChange={togglePublished}
            disabled={pending}
            aria-label="Publicado na loja"
          />
          {product.published ? "Publicado" : "Rascunho"}
        </label>

        <div className="flex gap-2">
          <Button asChild variant="outline" size="icon" aria-label="Editar">
            <Link href={`/admin/produtos/${product.id}`}>
              <Pencil className="size-4" />
            </Link>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Excluir" disabled={pending}>
                <Trash2 className="size-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir “{product.name}”?</AlertDialogTitle>
                <AlertDialogDescription>
                  O produto sai da loja imediatamente. Essa ação não pode ser desfeita.
                  Para só esconder, use o botão “Publicado”.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 text-white hover:bg-red-500"
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </li>
  )
}
