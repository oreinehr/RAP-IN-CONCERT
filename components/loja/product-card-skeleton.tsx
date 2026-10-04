import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col border border-border bg-card">
      <Skeleton className="aspect-square w-full rounded-none bg-white/5" />
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <Skeleton className="h-3.5 w-24 bg-white/5" />
        <Skeleton className="h-5 w-4/5 bg-white/5" />
        <Skeleton className="h-5 w-2/5 bg-white/5" />
        <Skeleton className="h-3 w-3/5 bg-white/5" />
        <Skeleton className="mt-auto h-10 w-full rounded-lg bg-white/5" />
      </div>
    </div>
  )
}

export default function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}
