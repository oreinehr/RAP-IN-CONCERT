import { z } from "zod"

const optionalMoney = z
  .number({ invalid_type_error: "Valor inválido" })
  .nonnegative("Não pode ser negativo")
  .nullable()

/** Validação do formulário do CMS — usada no cliente e na server action. */
export const productFormSchema = z
  .object({
    name: z.string().trim().min(1, "Informe o nome").max(120),
    slug: z
      .string()
      .trim()
      .min(1, "Informe o slug")
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use só letras minúsculas, números e hífens"),
    category: z.enum(["camisetas", "acessorios", "kits"]),
    price: z
      .number({ invalid_type_error: "Informe o preço" })
      .nonnegative("Não pode ser negativo"),
    oldPrice: optionalMoney,
    installment: z.string().trim().max(80).nullable(),
    badge: z.enum(["mais-vendido", "novo", "oferta"]).nullable(),
    rating: z.number().min(0).max(5),
    reviews: z.number().int().nonnegative(),
    available: z.boolean(),
    published: z.boolean(),
    description: z.string().trim().max(4000).nullable(),
    image: z.string().trim().min(1, "Envie a imagem principal"),
    images: z.array(z.string().trim().min(1)).max(12),
    options: z
      .array(
        z.object({
          name: z.string().trim().min(1, "Nome da variação"),
          values: z.array(z.string().trim().min(1)).min(1, "Informe ao menos um valor"),
        }),
      )
      .max(5),
    position: z.number().int(),
  })
  .refine((data) => data.oldPrice == null || data.oldPrice > data.price, {
    message: "O preço antigo deve ser maior que o preço atual",
    path: ["oldPrice"],
  })

export type ProductFormValues = z.infer<typeof productFormSchema>

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
