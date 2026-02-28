"use client"

import { motion } from "motion/react"
import { Marquee } from "@/components/ui/marquee"
import { cn } from "@/lib/utils"

const REVIEWS: { name: string; body: string }[] = [
  {
    name: "Rodrigo e Bárbara",
    body: "Comprei meu Renegade na Via Brasil. Atendimento impecável e o carro veio exatamente como descrito. Recomendo!",
  },
  {
    name: "Maria S.",
    body: "Melhor concessionária que já lidamos. Transparência do início ao fim e pós-venda que faz a diferença.",
  },
  {
    name: "Carlos A.",
    body: "Veículo periciado, revisado e com garantia. Fiquei tranquilo na compra. Via Brasil é tradição em Ribeirão Pires.",
  },
  {
    name: "Fernanda L.",
    body: "Processo de venda do meu carro foi rápido e justo. Equipe profissional e preços honestos.",
  },
  {
    name: "João P.",
    body: "Há mais de 30 anos no mercado e se mantém no topo. Qualidade e confiança que poucos oferecem.",
  },
  {
    name: "Patricia M.",
    body: "Comprei meu primeiro carro na Via Brasil. Explicaram tudo com paciência e o financiamento saiu rápido.",
  },
]

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="#FBBF24"
    className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
    aria-hidden
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

function ReviewCard({ name, body }: { name: string; body: string }) {
  return (
    <figure
      className={cn(
        "relative h-full w-72 shrink-0 overflow-hidden rounded-xl border p-6 sm:w-96",
        "border-white/10 bg-white/5 text-white transition-all duration-300 hover:bg-white/10"
      )}
    >
      <div className="absolute right-3 top-3 flex gap-0.5" aria-label="5 estrelas">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <figcaption className="text-sm font-semibold text-[#F1F5F9]">
        {name}
      </figcaption>
      <blockquote className="mt-2 text-sm leading-snug text-white/90 sm:text-lg">
        {body}
      </blockquote>
    </figure>
  )
}

export function TestimonialsSection() {
  return (
    <motion.section
      id="depoimentos"
      className="relative w-full scroll-mt-24 bg-[#00020C] py-12 sm:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex flex-col items-center gap-4 text-center"
        >
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
            Avaliação
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Faça parte da nossa história
          </h2>
          <p className="max-w-xl text-base text-white/60 sm:text-lg md:text-xl">
            Veja o que nossos clientes falam sobre a experiência de comprar e
            vender na Via Brasil.
          </p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.15, once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Marquee speed={40} pauseOnHover gap="1.25rem" className="py-4">
            {REVIEWS.map((review, i) => (
              <ReviewCard key={`top-${i}`} {...review} />
            ))}
          </Marquee>

          <Marquee speed={32} reverse pauseOnHover gap="1.25rem" className="py-4">
            {[...REVIEWS].reverse().map((review, i) => (
              <ReviewCard key={`bottom-${i}`} {...review} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#00020C] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#00020C] to-transparent sm:w-24" />
        </motion.div>
      </div>
    </motion.section>
  )
}
