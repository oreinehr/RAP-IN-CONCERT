"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { catalogFilters } from "@/lib/loja/products"
import { priceRanges, sortOptions } from "@/lib/loja/filters"
import type { CatalogFilterId, PriceRangeId, SortId } from "@/lib/loja/types"
import { cn } from "@/lib/utils"

type StoreFiltersProps = {
  filter: CatalogFilterId
  onFilterChange: (filter: CatalogFilterId) => void
  priceRange: PriceRangeId
  onPriceRangeChange: (range: PriceRangeId) => void
  sort: SortId
  onSortChange: (sort: SortId) => void
  total: number
}

const selectClass =
  "h-10 w-full rounded-lg border-border bg-transparent text-sm text-gray-300 hover:text-white sm:w-[190px]"

export default function StoreFilters({
  filter,
  onFilterChange,
  priceRange,
  onPriceRangeChange,
  sort,
  onSortChange,
  total,
}: StoreFiltersProps) {
  return (
    <div className="mb-8 flex flex-col gap-4">
      {/* Categorias — rolagem horizontal no mobile, sem overflow na página */}
      <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          role="tablist"
          aria-label="Categorias de produtos"
          className="flex w-max gap-2"
        >
          {catalogFilters.map((item) => {
            const active = item.id === filter
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onFilterChange(item.id)}
                className={cn(
                  "whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-semibold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "border-white bg-white text-black"
                    : "border-border text-gray-300 hover:border-white/40 hover:text-white",
                )}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {total} {total === 1 ? "produto" : "produtos"}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Select
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as PriceRangeId)}
          >
            <SelectTrigger className={selectClass} aria-label="Filtrar por preço">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-border bg-card">
              {priceRanges.map((range) => (
                <SelectItem key={range.id} value={range.id}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sort}
            onValueChange={(value) => onSortChange(value as SortId)}
          >
            <SelectTrigger className={selectClass} aria-label="Ordenar produtos">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-border bg-card">
              {sortOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
