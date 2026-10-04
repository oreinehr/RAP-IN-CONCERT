import CartButton from "./cart-button"

export default function StoreHeader() {
  return (
    <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="font-display text-4xl text-white md:text-7xl">
          Loja Oficial
        </h1>
        <p className="mt-3 max-w-2xl text-base text-gray-300 md:text-lg">
          Vista o movimento. Produtos oficiais do Rap in Concert — parte da
          renda sustenta as próximas edições do espetáculo.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden text-sm text-muted-foreground sm:inline">
          Seu carrinho
        </span>
        <CartButton className="border border-border bg-card hover:border-white/30" />
      </div>
    </header>
  )
}
