"use client"

import { useState, useTransition, type FormEvent, type ReactNode } from "react"
import Link from "next/link"
import { Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import ImageUpload from "@/components/admin/image-upload"
import { saveProduct } from "@/app/admin/produtos/actions"
import { badgeLabels, productCategories } from "@/lib/loja/catalog"
import {
  productFormSchema,
  slugify,
  type ProductFormValues,
} from "@/lib/loja/product-schema"
import type { ProductBadge, ProductCategoryId } from "@/lib/loja/types"

type ProductFormProps = {
  productId: string | null
  initial?: ProductFormValues
  nextPosition: number
}

type OptionDraft = { name: string; values: string }

const NO_BADGE = "nenhum"

/** Aceita "89,90" e "89.90". */
function parseNumber(value: string) {
  const text = value.trim()
  if (text === "") return null
  // Com vírgula, pontos são separador de milhar ("1.299,90").
  const normalized = text.includes(",") ? text.replace(/\./g, "").replace(",", ".") : text
  const number = Number(normalized)
  return Number.isFinite(number) ? number : Number.NaN
}

function formatNumber(value: number | null | undefined) {
  return value == null ? "" : String(value).replace(".", ",")
}

export default function ProductForm({ productId, initial, nextPosition }: ProductFormProps) {
  const [pending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [name, setName] = useState(initial?.name ?? "")
  const [slug, setSlug] = useState(initial?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(Boolean(initial))
  const [category, setCategory] = useState<ProductCategoryId>(initial?.category ?? "camisetas")
  const [price, setPrice] = useState(formatNumber(initial?.price))
  const [oldPrice, setOldPrice] = useState(formatNumber(initial?.oldPrice))
  const [installment, setInstallment] = useState(initial?.installment ?? "")
  const [badge, setBadge] = useState<ProductBadge | null>(initial?.badge ?? null)
  const [rating, setRating] = useState(formatNumber(initial?.rating ?? 5))
  const [reviews, setReviews] = useState(String(initial?.reviews ?? 0))
  const [available, setAvailable] = useState(initial?.available ?? true)
  const [published, setPublished] = useState(initial?.published ?? true)
  const [description, setDescription] = useState(initial?.description ?? "")
  const [image, setImage] = useState(initial?.image ?? "")
  const [images, setImages] = useState<string[]>(initial?.images ?? [])
  const [position, setPosition] = useState(String(initial?.position ?? nextPosition))
  const [options, setOptions] = useState<OptionDraft[]>(
    (initial?.options ?? [{ name: "Tamanho", values: ["P", "M", "G", "GG"] }]).map((option) => ({
      name: option.name,
      values: option.values.join(", "),
    })),
  )

  function handleNameChange(value: string) {
    setName(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  function updateOption(index: number, patch: Partial<OptionDraft>) {
    setOptions((current) =>
      current.map((option, i) => (i === index ? { ...option, ...patch } : option)),
    )
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const values = {
      name,
      slug,
      category,
      price: parseNumber(price),
      oldPrice: parseNumber(oldPrice),
      installment: installment.trim() || null,
      badge,
      rating: parseNumber(rating) ?? 0,
      reviews: Number(reviews) || 0,
      available,
      published,
      description: description.trim() || null,
      image,
      images,
      options: options
        .filter((option) => option.name.trim() || option.values.trim())
        .map((option) => ({
          name: option.name,
          values: option.values
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
        })),
      position: Number(position) || 0,
    }

    const parsed = productFormSchema.safeParse(values)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0])
        fieldErrors[key] ??= issue.message
      }
      setErrors(fieldErrors)
      toast.error("Confira os campos destacados")
      return
    }

    setErrors({})
    startTransition(async () => {
      const result = await saveProduct(productId, parsed.data)
      if (result?.error) toast.error(result.error)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_320px]" noValidate>
      <div className="space-y-6">
        <Section title="Informações">
          <Field label="Nome" htmlFor="name" error={errors.name}>
            <Input id="name" value={name} onChange={(e) => handleNameChange(e.target.value)} />
          </Field>

          <Field
            label="Slug (endereço)"
            htmlFor="slug"
            error={errors.slug}
            hint={slug ? `/loja/${slug}` : undefined}
          >
            <Input
              id="slug"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true)
                setSlug(slugify(e.target.value))
              }}
            />
          </Field>

          <Field label="Descrição" htmlFor="description" error={errors.description}>
            <Textarea
              id="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
        </Section>

        <Section title="Imagens">
          <Field label="Imagem principal" error={errors.image}>
            <ImageUpload
              label="Enviar"
              value={image ? [image] : []}
              onChange={(urls) => setImage(urls[0] ?? "")}
            />
          </Field>
          <Field label="Galeria (opcional)" error={errors.images}>
            <ImageUpload label="Adicionar" multiple value={images} onChange={setImages} />
          </Field>
        </Section>

        <Section title="Variações">
          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={index} className="flex flex-col gap-2 sm:flex-row">
                <Input
                  aria-label="Nome da variação"
                  placeholder="Tamanho"
                  value={option.name}
                  onChange={(e) => updateOption(index, { name: e.target.value })}
                  className="sm:w-40"
                />
                <Input
                  aria-label="Valores separados por vírgula"
                  placeholder="P, M, G, GG"
                  value={option.values}
                  onChange={(e) => updateOption(index, { values: e.target.value })}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Remover variação"
                  onClick={() => setOptions((current) => current.filter((_, i) => i !== index))}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
            {errors.options && <p className="text-sm text-red-400">{errors.options}</p>}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setOptions((current) => [...current, { name: "", values: "" }])}
            >
              <Plus className="size-4" />
              Adicionar variação
            </Button>
          </div>
        </Section>
      </div>

      <div className="space-y-6">
        <Section title="Status">
          <ToggleRow
            id="published"
            label="Publicado na loja"
            hint="Desligado = rascunho, não aparece no site"
            checked={published}
            onChange={setPublished}
          />
          <ToggleRow
            id="available"
            label="Disponível"
            hint="Desligado = aparece como esgotado"
            checked={available}
            onChange={setAvailable}
          />
        </Section>

        <Section title="Preço">
          <Field label="Preço (R$)" htmlFor="price" error={errors.price}>
            <Input id="price" inputMode="decimal" placeholder="89,90" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Field>
          <Field label="Preço antigo (R$)" htmlFor="oldPrice" error={errors.oldPrice} hint="Opcional — mostra o desconto">
            <Input id="oldPrice" inputMode="decimal" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />
          </Field>
          <Field label="Texto de parcelamento" htmlFor="installment" error={errors.installment} hint="Opcional — calculado automaticamente se vazio">
            <Input id="installment" placeholder="3x de R$ 29,97" value={installment} onChange={(e) => setInstallment(e.target.value)} />
          </Field>
        </Section>

        <Section title="Organização">
          <Field label="Categoria" error={errors.category}>
            <Select value={category} onValueChange={(value) => setCategory(value as ProductCategoryId)}>
              <SelectTrigger className="w-full" aria-label="Categoria">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {productCategories.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Selo" error={errors.badge}>
            <Select
              value={badge ?? NO_BADGE}
              onValueChange={(value) => setBadge(value === NO_BADGE ? null : (value as ProductBadge))}
            >
              <SelectTrigger className="w-full" aria-label="Selo">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NO_BADGE}>Nenhum</SelectItem>
                {Object.entries(badgeLabels).map(([id, label]) => (
                  <SelectItem key={id} value={id}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Nota" htmlFor="rating" error={errors.rating}>
              <Input id="rating" inputMode="decimal" value={rating} onChange={(e) => setRating(e.target.value)} />
            </Field>
            <Field label="Avaliações" htmlFor="reviews" error={errors.reviews}>
              <Input id="reviews" inputMode="numeric" value={reviews} onChange={(e) => setReviews(e.target.value)} />
            </Field>
            <Field label="Ordem" htmlFor="position" error={errors.position}>
              <Input id="position" inputMode="numeric" value={position} onChange={(e) => setPosition(e.target.value)} />
            </Field>
          </div>
        </Section>

        <div className="flex gap-3 lg:sticky lg:top-24">
          <Button type="button" variant="outline" asChild className="flex-1">
            <Link href="/admin/produtos">Cancelar</Link>
          </Button>
          <Button type="submit" disabled={pending} className="flex-1">
            {pending ? "Salvando…" : productId ? "Salvar" : "Criar produto"}
          </Button>
        </div>
      </div>
    </form>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4 rounded-xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-300">{title}</h2>
      {children}
    </section>
  )
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string
  htmlFor?: string
  error?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : (
        hint && <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  )
}

function ToggleRow({
  id,
  label,
  hint,
  checked,
  onChange,
}: {
  id: string
  label: string
  hint: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <Label htmlFor={id}>{label}</Label>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  )
}
