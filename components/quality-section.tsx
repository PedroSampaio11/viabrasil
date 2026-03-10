"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Heart, Shield, Car, Headphones } from "lucide-react"
import { AccentCtaButton } from "./accent-cta-button"

export function QualitySection() {
  const features = [
    { icon: Heart, text: "30 ANOS DE ESTRADA" },
    { icon: Car, text: "ENTREGA PREMIUM" },
    { icon: Headphones, text: "PÓS-VENDA HUMANIZADO" },
    { icon: Shield, text: "LAUDO CAUTELAR 100% APROVADO" },
  ]

  return (
    <motion.section
      className="relative w-full min-h-[480px] overflow-hidden bg-[#00020C]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <Image
          src="/images/ImageContainer.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00020C]/95 via-[#00020C]/80 to-[#00020C]/40" />
      </div>

      <div className="relative container mx-auto px-4 pt-16 md:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-12 flex-1 max-w-6xl">
          {/* Coluna esquerda: badge, título, descrição e lista de features */}
          <motion.div
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-6">
              SOBRE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Qualidade Garantida
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-8 md:mb-10 leading-relaxed max-w-xl">
              Há mais de 30 anos, nossa obsessão é a sua segurança. Na Via Brasil, qualidade não é diferencial, é regra.
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.li
                    key={index}
                    className="flex items-center gap-4 text-white"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
                      <Icon className="w-5 h-5 text-yellow-500" strokeWidth={2} />
                    </div>
                    <span className="text-sm md:text-base font-medium uppercase tracking-wide">
                      {feature.text}
                    </span>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>

          {/* Coluna direita: botão Saiba Mais */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-start lg:justify-end lg:pb-1"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AccentCtaButton href="/sobre" ariaLabel="Saiba mais sobre a Via Brasil" className="min-w-[14rem] sm:min-w-[16rem] px-8 sm:px-10">
              Saiba Mais
            </AccentCtaButton>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
