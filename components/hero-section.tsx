import Image from "next/image"
import { Check, Shield, TrendingUp, ShoppingCart, Car } from "lucide-react"

export function HeroSection() {
  const badges = [
    { icon: TrendingUp, text: "INOVAÇÃO" },
    { icon: Check, text: "100% PERICIADOS" },
    { icon: Shield, text: "30 ANOS DE ESTRADA" },
    { icon: ShoppingCart, text: "COMPRA SEGURA" },
    { icon: Car, text: "+100K VEÍCULOS VENDIDOS" },
  ]

  return (
    <section className="relative h-[500px] sm:h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/via-brasil-home.png"
          alt="Via Brasil Showroom"
          fill
          quality={100}
          className="object-cover"
          priority
        />
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Tradição em realizar sonhos
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 md:mb-12 leading-relaxed">
            Mais de 30 anos de história em Ribeirão Preto. Veículos
            periciados, revisados e com garantia de procedência.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-6">
            {badges.map((badge, index) => {
              const Icon = badge.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 text-white/90 group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Icon size={16} className="text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{badge.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Decorative element - bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00020C] to-transparent" />
    </section>
  )
}

