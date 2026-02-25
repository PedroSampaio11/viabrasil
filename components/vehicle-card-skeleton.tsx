import { Skeleton } from "@/components/ui/skeleton"

export function VehicleCardSkeleton() {
  return (
    <div className="relative bg-[#00020C] rounded-lg overflow-hidden border-2 border-yellow-500/30">
      {/* Badge Skeleton */}
      <div className="absolute top-4 left-4 z-10">
        <Skeleton className="h-6 w-16" />
      </div>

      {/* Image Skeleton */}
      <div className="relative h-[320px] bg-gradient-to-b from-gray-800 to-gray-900">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 space-y-3">
        {/* Brand */}
        <Skeleton className="h-5 w-24" />

        {/* Model */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-white/10">
          <Skeleton className="h-7 w-32" />
        </div>

        {/* Tag */}
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  )
}

