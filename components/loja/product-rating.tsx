import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

type ProductRatingProps = {
  rating: number
  reviews?: number
  className?: string
  size?: "sm" | "md"
}

const stars = [0, 1, 2, 3, 4]

export default function ProductRating({
  rating,
  reviews,
  className,
  size = "sm",
}: ProductRatingProps) {
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100))
  const starSize = size === "md" ? "size-4" : "size-3.5"

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      aria-label={`Avaliação ${rating.toFixed(1)} de 5${
        reviews ? `, ${reviews} avaliações` : ""
      }`}
    >
      <span className="relative inline-flex" aria-hidden="true">
        <span className="flex gap-0.5 text-white/15">
          {stars.map((index) => (
            <Star key={index} className={cn(starSize, "fill-current")} />
          ))}
        </span>
        <span
          className="absolute inset-y-0 left-0 flex gap-0.5 overflow-hidden text-accent"
          style={{ width: `${percent}%` }}
        >
          {stars.map((index) => (
            <Star key={index} className={cn(starSize, "shrink-0 fill-current")} />
          ))}
        </span>
      </span>
      <span className="text-xs text-muted-foreground">
        {rating.toFixed(1)}
        {reviews ? ` (${reviews})` : ""}
      </span>
    </div>
  )
}
