"use client"

import Image from "next/image"
import { motion } from "motion/react"
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
    <section className="relative h-[380px] sm:h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/HeroIMG.png"
          alt="Via Brasil Showroom"
          fill
          unoptimized
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="container mx-auto flex flex-1 flex-col justify-center px-4">
          <div className="max-w-2xl sm:pt-20">
            <motion.h1
              className="text-3xl max-w-[265px] sm:text-4xl md:text-5xl lg:text-6xl md:max-w-lg font-bold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Tradição em realizar sonhos
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              A referência automotiva de Ribeirão Pires há mais de 30 anos. Novos e Seminovos com laudo cautelar aprovado e garantia total de procedência.
            </motion.p>
          </div>
        </div>

        {/* Badges carousel - full width de ponta a ponta */}
        <motion.div
          className="relative z-10 w-full overflow-hidden sm:pb-20 sm:pb-20"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Marquee speed={35} pauseOnHover gap="1rem" className="w-full py-4">
            {badges.map((badge, index) => (
              <BadgeCard key={index} icon={badge.icon} text={badge.text} />
            ))}
          </Marquee>
        </motion.div>
      </div>

      {/* Decorative element - bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00020C] to-transparent" />
    </section>
  )
}

