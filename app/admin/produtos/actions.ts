"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { productFormSchema, type ProductFormValues } from "@/lib/loja/product-schema"
import { createSupabaseServerClient, getAdminUser } from "@/lib/supabase/server"

type ActionResult = { error: string } | undefined

function toRow(values: ProductFormValues) {
  return {
    name: values.name,
    slug: values.slug,
    category: values.category,
    price: values.price,
    old_price: values.oldPrice,
    installment: values.installment || null,
    badge: values.badge,
    rating: values.rating,
    reviews: values.reviews,
    available: values.available,
    published: values.published,
    description: values.description || null,
    image: values.image,
    images: values.images,
    options: values.options,
    position: values.position,
  }
}

/** Loja (home, /loja e páginas de produto) é estática: revalida tudo. */
function revalidateStore() {
  revalidatePath("/", "layout")
}

async function requireAdmin() {
  const user = await getAdminUser()
  if (!user) throw new Error("Sem permissão")
}

export async function saveProduct(
  id: string | null,
  input: ProductFormValues,
): Promise<ActionResult> {
  await requireAdmin()

  const parsed = productFormSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos" }
  }

  const supabase = await createSupabaseServerClient()
  const row = toRow(parsed.data)
  const { error } = id
    ? await supabase.from("products").update(row).eq("id", id)
    : await supabase.from("products").insert(row)

  if (error) {
    if (error.code === "23505") return { error: "Já existe um produto com esse slug" }
    return { error: error.message }
  }

  revalidateStore()
  redirect("/admin/produtos")
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  await requireAdmin()

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from("products").delete().eq("id", id)
  if (error) return { error: error.message }

  revalidateStore()
}

export async function setProductPublished(
  id: string,
  published: boolean,
): Promise<ActionResult> {
  await requireAdmin()

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from("products").update({ published }).eq("id", id)
  if (error) return { error: error.message }

  revalidateStore()
  revalidatePath("/admin/produtos")
}

export async function signOut() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}
