"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Heart, Shield, Car, Headphones } from "lucide-react"
import { AccentCtaButton } from "./accent-cta-button"

export function QualitySection() {
  const features = [
    {
      icon: Heart,
      text: "30 ANOS DE ESTRADA",
    },
    {
      icon: Shield,
      text: "LAUDO CAUTELAR 100% APROVADO",
    },
    {
      icon: Car,
      text: "ENTREGA PREMIUM",
    },
    {
      icon: Headphones,
      text: "PÓS-VENDA HUMANIZADO",
    },
  ]

  return (
    <motion.section
      className="relative min-h-[700px] w-full bg-[#00020C]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 flex">
        {/* Lado esquerdo - gradiente escuro */}
        <div className="flex-1 bg-gradient-to-r from-[#00020C] via-[#00020C]/90 to-transparent" />

        {/* Lado direito - imagem com border-radius */}
        <div className="w-full md:w-1/2 h-[600px] lg:w-2/5 relative overflow-hidden rounded-r-[22px] relative sm:right-20">
          <Image
            src="/images/qualidade-viabrasil.jpg"
            alt="Qualidade Via Brasil"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#00020C] via-[#00020C]/90 to-transparent pointer-events-none z-0" />
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div className="mb-6">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
              Sobre
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 md:mb-6 leading-tight">
            Qualidade Garantida
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-10 leading-relaxed max-w-xl">
            Há mais de 30 anos, nossa obsessão é a sua segurança. Na Via Brasil, qualidade não é diferencial, é regra.
          </p>

          {/* CTA Button */}
          <AccentCtaButton href="/sobre" ariaLabel="Saiba mais sobre a Via Brasil">
            Saiba mais
          </AccentCtaButton>
        </motion.div>
      </div>

      {/* Bottom Features Strip */}
      <motion.div
        className="relative border-t-4 border-yellow-500 bg-[#00020C]/95 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 text-white group"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                    <Icon className="w-6 h-6 text-yellow-500" />
                  </div>
                  <p className="text-sm md:text-base font-medium leading-tight">
                    {feature.text}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Decorative gradient bottom */}
      <div className="absolute hidden sm:block bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00020C] to-transparent pointer-events-none" />
    </motion.section>
  )
}

