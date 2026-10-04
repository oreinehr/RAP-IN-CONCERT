const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export function formatPrice(value: number) {
  return brl.format(value)
}

/**
 * Texto de parcelamento padrão da loja.
 * Usado quando o produto não define `installment` explicitamente.
 */
export function formatInstallment(price: number, max = 3) {
  const parcels = price >= 60 ? max : 1
  if (parcels === 1) return `à vista no PIX ou cartão`
  return `ou ${parcels}x de ${formatPrice(price / parcels)} sem juros`
}

export function discountPercent(price: number, oldPrice?: number) {
  if (!oldPrice || oldPrice <= price) return null
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}
