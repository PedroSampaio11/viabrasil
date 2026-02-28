import Image from "next/image"
import Link from "next/link"

interface VehicleCardProps {
  brand: string
  model: string
  year: string
  price: string
  imageUrl: string
  /** Quilometragem (ex.: "0km", "76.000km") – vindo do mapper */
  badge: string
  isNew?: boolean
  id?: string
}

export function VehicleCard({
  brand,
  model,
  year,
  price,
  imageUrl,
  badge,
  isNew = true,
  id = "1",
}: VehicleCardProps) {
  return (
    <Link href={`/estoque/${id}`} className="block">
      <div className="group relative bg-[#00020C] rounded-lg overflow-hidden border-2 border-white/10 hover:border-yellow-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-black/30 cursor-pointer">
        {/* Badge km na foto – sempre exibido (0km ou valor) */}
        <div className="absolute top-4 left-4 z-10 bg-yellow-500/90 backdrop-blur-sm text-black px-3 py-1.5 rounded-md text-xs font-bold border border-yellow-400/30 shadow-sm">
          {badge || "—"}
        </div>

        {/* Image */}
        <div className="relative h-[320px] bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
          <Image
            src={imageUrl}
            alt={`${brand} ${model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Brand */}
          <div>
            <h3 className="text-yellow-500 font-bold text-base sm:text-lg">{brand}</h3>
          </div>

          {/* Model */}
          <div>
            <p className="text-white font-semibold text-sm sm:text-base">{model}</p>
            <p className="text-white/60 text-xs sm:text-sm">{year}</p>
          </div>

          {/* Price */}
          <div className="pt-2 border-t border-white/10">
            <p className="text-yellow-500 font-bold text-xl sm:text-2xl">{price}</p>
          </div>

          {/* Tag 0km */}
          {isNew && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">
                0km
              </span>
            </div>
          )}
        </div>

        {/* Hover effect overlay - discreto */}
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Link>
  )
}

