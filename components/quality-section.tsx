import Image from "next/image"
import Link from "next/link"
import { Heart, Shield, Car, Headphones } from "lucide-react"

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
    <section className="relative min-h-[700px] w-full bg-[#00020C]">
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
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-block px-4 py-2 bg-[#3B4055] text-white text-sm font-semibold rounded-[11px] mb-6 border border-[#3B4055]/50">
            SOBRE
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
          <Link
            href="/sobre"
            className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-yellow-500 hover:bg-yellow-600 text-black rounded-[27px] font-bold text-base md:text-xl transition-all shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40"
          >
            SAIBA MAIS
          </Link>
        </div>
      </div>

      {/* Bottom Features Strip */}
      <div className="relative border-t-4 border-yellow-500 bg-[#00020C]/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 text-white group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                    <Icon className="w-6 h-6 text-yellow-500" />
                  </div>
                  <p className="text-sm md:text-base font-medium leading-tight">
                    {feature.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Decorative gradient bottom */}
      <div className="absolute hidden sm:block bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00020C] to-transparent pointer-events-none" />
    </section>
  )
}

