"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { AccentCtaButton } from "./accent-cta-button"

export function SellTradeSection() {
  return (
    <motion.section
      // Adicionei um fundo escuro padrão aqui (bg-[#00020C]) já que o texto é branco. 
      // Se a sua página já tiver fundo escuro, você pode remover ou ajustar essa classe.
      className="relative w-full overflow-hidden bg-[#00020C] pt-16 lg:py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      {/* Container: no mobile ordem = texto, imagem, botão; no desktop = (texto + botão) | imagem */}
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Wrapper esquerdo: no lg agrupa texto + botão; no mobile display:contents para ordenar */}
        <div className="contents lg:flex lg:flex-col lg:w-1/2 lg:max-w-2xl">
          {/* Conteúdo (badge, título, descrição) – mobile: order 1 */}
          <motion.div
            className="w-full order-1"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6">
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                Venda ou troca
              </span>
            </div>
            <h2 className="text-2xl max-w-[295px] sm:max-w-none sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Seu seminovo tem mais valor na Via Brasil.
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/80  md:mb-10 leading-relaxed">
              Garantimos uma avaliação justa e transparente do seu veículo atual. Use o seu carro como entrada ou venda com segurança e pagamento à vista.
            </p>
          </motion.div>

          {/* Botão – mobile: order 3 (por último, depois da imagem); desktop: dentro da coluna esquerda */}
          <div className="order-3 lg:order-2 w-full lg:w-auto">
            <AccentCtaButton href="/venda" ariaLabel="Cotar meu veículo" className="w-full sm:w-auto">
              Cotar agora
            </AccentCtaButton>
          </div>
        </div>

        {/* Imagem – mobile: order 2 (entre texto e botão); desktop: coluna direita */}
        <motion.div
          className="w-full lg:w-1/2 relative aspect-video lg:aspect-square max-h-[500px] rounded-3xl overflow-hidden shadow-2xl order-2"
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