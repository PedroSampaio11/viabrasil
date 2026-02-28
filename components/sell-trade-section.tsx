import Image from "next/image"
import { AccentCtaButton } from "./accent-cta-button"

export function SellTradeSection() {
  return (
    <section className="relative min-h-[400px] sm:min-h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/faixada-viabrasil.jpg"
          alt="Fachada Via Brasil"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
      </div>

      {/* Content – z-index acima do gradiente decorativo */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="mb-6">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
              Venda ou troca
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 md:mb-6 leading-tight">
            Seu seminovo vale mais na Via Brasil.
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-10 leading-relaxed max-w-xl">
            Escolha o modelo ideal para o seu estilo de vida. O propósito da Via Brasil é ser a melhor escolha em automóveis para seus clientes e fazer parte dos momentos especiais da sua vida
          </p>

          {/* CTA Button – componente próprio */}
          <AccentCtaButton href="/venda" ariaLabel="Cotar meu veículo">
            Cotar agora
          </AccentCtaButton>
        </div>
      </div>

      {/* Decorative gradient bottom */}
      <div className="absolute hidden sm:block bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00020C] to-transparent" />
    </section>
  )
}

