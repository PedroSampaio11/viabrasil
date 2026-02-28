"use client"

import Image from "next/image"
import { Check, Shield, TrendingUp, ShoppingCart, Car } from "lucide-react"
import { Marquee } from "@/components/ui/marquee"
import { cn } from "@/lib/utils"

const badges = [
  { icon: TrendingUp, text: "INOVAÇÃO" },
  { icon: Check, text: "100% PERICIADOS" },
  { icon: Shield, text: "30 ANOS DE ESTRADA" },
  { icon: ShoppingCart, text: "COMPRA SEGURA" },
  { icon: Car, text: "+100K VEÍCULOS VENDIDOS" },
]

function BadgeCard({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  text: string
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-3 rounded-xl border px-5 py-3",
        "border-white/10 bg-white/5 text-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
        <Icon size={18} className="text-white" />
      </div>
      <span className="whitespace-nowrap text-sm font-medium">{text}</span>
    </div>
  )
}

export function HeroSection() {
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
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="container mx-auto flex flex-1 flex-col justify-center px-4">
          <div className="max-w-2xl pt-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Tradição em realizar sonhos
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Mais de 30 anos de história em Ribeirão Preto. Veículos
              periciados, revisados e com garantia de procedência.
            </p>
          </div>
        </div>

        {/* Badges carousel - full width de ponta a ponta */}
        <div className="relative z-10 w-full overflow-hidden pb-20 sm:pb-20">
          <Marquee speed={35} pauseOnHover gap="1rem" className="w-full py-4">
            {badges.map((badge, index) => (
              <BadgeCard key={index} icon={badge.icon} text={badge.text} />
            ))}
          </Marquee>
        </div>
      </div>

      {/* Decorative element - bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00020C] to-transparent" />
    </section>
  )
}

