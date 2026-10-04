"use client"

import { useMemo, useState } from "react"
import { filterAndSortProducts } from "@/lib/loja/filters"
import { getCatalogFilters } from "@/lib/loja/catalog"
import type {
  CatalogFilterId,
  PriceRangeId,
  Product,
  SortId,
} from "@/lib/loja/types"
import ProductCard from "./product-card"
import StoreFilters from "./store-filters"

export default function StoreCatalog({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<CatalogFilterId>("todos")
  const [priceRange, setPriceRange] = useState<PriceRangeId>("qualquer")
  const [sort, setSort] = useState<SortId>("relevancia")

  const filters = useMemo(() => getCatalogFilters(products), [products])

  const visible = useMemo(
    () => filterAndSortProducts(products, { filter, priceRange, sort }),
    [products, filter, priceRange, sort],
  )

  return (
    <>
      <StoreFilters
        filters={filters}
        filter={filter}
        onFilterChange={setFilter}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        sort={sort}
        onSortChange={setSort}
        total={visible.length}
      />

      {visible.length === 0 ? (
        <div className="border border-border bg-card px-6 py-16 text-center">
          <p className="font-display text-2xl text-white">
            Nada por aqui ainda
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Nenhum produto encontrado com esses filtros. Tente outra categoria
            ou faixa de preço.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  )
}
