"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { AccentCtaButton } from "./accent-cta-button"

export function SellTradeSection() {
  return (
    <motion.section
      // Adicionei um fundo escuro padrão aqui (bg-[#00020C]) já que o texto é branco. 
      // Se a sua página já tiver fundo escuro, você pode remover ou ajustar essa classe.
      className="relative w-full overflow-hidden bg-[#00020C] py-16 lg:py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      {/* Container com Flexbox: Empilha no mobile (flex-col) e fica lado a lado no desktop (lg:flex-row) */}
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Content – Lado Esquerdo */}
        <motion.div
          className="w-full lg:w-1/2 max-w-2xl"
          initial={{ opacity: 0, x: -32 }} // Animação vindo da esquerda
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div className="mb-6">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
              Venda ou troca
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Seu seminovo tem mais valor na Via Brasil.
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-8 md:mb-10 leading-relaxed">
            Garantimos uma avaliação justa e transparente do seu veículo atual. Use o seu carro como entrada ou venda com segurança e pagamento à vista.
          </p>

          {/* CTA Button */}
          <AccentCtaButton href="/venda" ariaLabel="Cotar meu veículo" className="w-full sm:w-auto">
            Cotar agora
          </AccentCtaButton>
        </motion.div>

        {/* Image – Lado Direito */}
        <motion.div
          // Trocamos o min-h fixo por proporções (aspect-ratio) para a imagem não esticar demais.
          // No mobile fica retangular (aspect-video) e no desktop fica mais quadradinha (aspect-square)
          className="w-full lg:w-1/2 relative aspect-video lg:aspect-square max-h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/KeysIMG.png"
            alt="Mão entregando chave de carro no showroom Via Brasil"
            fill
            unoptimized
            className="object-cover"
            priority
          />
        </motion.div>

      </div>
    </motion.section>
  )
}