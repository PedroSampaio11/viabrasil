"use client"

import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Target,
  Eye,
  Heart,
  Play,
  Users,
} from "lucide-react"

// Nomes reais dos arquivos em public/images/sobre/ (com espaços e caracteres especiais)
const SOBRE_IMAGES = [
  "2009 Uma das primeiras faixadas da Via Brasil (Primeiro registro)_.webp",
  "2012 Nova faixada + expansão_.webp",
  "2014 Nova faixada + expansão 2_.webp",
  "2021 Reforma finalizada_.webp",
  "2023 Expansão.webp",
  "2025 Reforma calçada_.webp",
]
const TIMELINE = [
  {
    year: "2009",
    title: "Onde Tudo Ganhou Forma",
    body: "Primeiro registro da fachada da Via Brasil. Aqui começa a história física da empresa como conhecemos hoje. Uma estrutura mais simples, mas já com um propósito claro: oferecer veículos com confiança, transparência e compromisso com cada cliente.",
    image: "/images/sobre/" + encodeURIComponent(SOBRE_IMAGES[0]),
  },
  {
    year: "2012",
    title: "O Primeiro Grande Salto",
    body: "Em 2012, o imóvel vizinho tornou-se disponível. A Via Brasil ampliou sua estrutura, incorporando o novo espaço à loja e aumentando significativamente sua área física e capacidade de exposição de veículos.",
    image: "/images/sobre/" + encodeURIComponent(SOBRE_IMAGES[1]),
  },
  {
    year: "2012",
    title: "Modernização e Consolidação",
    body: "Ainda em 2012, após a expansão, a loja passou por uma renovação completa de fachada. O novo visual trouxe mais presença, organização e identidade à marca.",
    image: "/images/sobre/" + encodeURIComponent(SOBRE_IMAGES[2]),
  },
  {
    year: "2021",
    title: "Nova Identidade, Nova Fase",
    body: "A fachada passou por uma grande modernização, acompanhando as transformações do mercado automotivo e o novo posicionamento da empresa. Mais moderna e imponente.",
    image: "/images/sobre/" + encodeURIComponent(SOBRE_IMAGES[3]),
  },
  {
    year: "2023",
    title: "Mais um Marco de Expansão",
    body: "Em 2023, o imóvel vizinho passou a integrar a estrutura da Via Brasil. A loja ampliou novamente seu espaço físico, incorporando um novo galpão e expandindo sua fachada.",
    image: "/images/sobre/" + encodeURIComponent(SOBRE_IMAGES[4]),
  },
  {
    year: "2025",
    title: "Evolução em Cada Detalhe",
    body: "Em 2025, a Via Brasil realizou a reforma completa da calçada da loja, reforçando o compromisso com a experiência do cliente, acessibilidade e valorização do espaço urbano.",
    image: "/images/sobre/" + encodeURIComponent(SOBRE_IMAGES[5]),
  },
]

const MVV = [
  {
    icon: Target,
    title: "Missão",
    text: "Oferecer veículos com confiança, transparência e compromisso com cada cliente, facilitando a realização do sonho de ter um carro com qualidade e procedência garantidas.",
  },
  {
    icon: Eye,
    title: "Visão",
    text: "Ser referência em compra e venda de veículos na região, reconhecida pela ética, pelo atendimento humanizado e pela excelência em cada negociação.",
  },
  {
    icon: Heart,
    title: "Valores",
    text: "Transparência, compromisso, perícia, pós-venda humanizado e tradição. Mais de 30 anos de estrada construindo confiança com nossos clientes.",
  },
]

const TEAM = [
  { name: "Lorenzo Marques", role: "CFO", desc: "Gestão financeira e estratégica." },
  { name: "Leila Cristina", role: "Gerente", desc: "Operações e relacionamento." },
  { name: "Carlos Silva", role: "Vendas", desc: "Consultoria e negociação." },
  { name: "Ana Costa", role: "Pós-venda", desc: "Suporte e satisfação do cliente." },
]

const TIMELINE_IMAGE_FALLBACK = "/images/via-brasil-home.png"

function TimelineItem({
  item,
  index,
  isActive,
  refCallback,
}: {
  item: (typeof TIMELINE)[0]
  index: number
  isActive: boolean
  refCallback: (el: HTMLLIElement | null) => void
}) {
  return (
    <li
      ref={refCallback}
      className="flex flex-col gap-4 transition-colors duration-300"
    >
      <span
        className={`font-bold text-sm transition-colors ${isActive ? "text-emerald-400" : "text-white/50"}`}
      >
        {item.year}
      </span>
      <h3
        className={`text-xl font-bold transition-colors sm:text-2xl ${isActive ? "text-amber-400" : "text-white/60"}`}
      >
        {item.title}
      </h3>
      <p
        className={`text-sm leading-relaxed transition-colors sm:text-base ${isActive ? "text-white/90" : "text-white/50"}`}
      >
        {item.body}
      </p>
    </li>
  )
}

function TimelineImage({ src, alt }: { src: string; alt: string }) {
  const [currentSrc, setCurrentSrc] = useState(src)
  useEffect(() => {
    setCurrentSrc(src)
  }, [src])
  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 50vw"
      unoptimized
      onError={() => setCurrentSrc(TIMELINE_IMAGE_FALLBACK)}
    />
  )
}

export default function SobrePage() {
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const sectionRef = useRef<HTMLElement | null>(null)

  // Item ativo (qual descrição) + progresso contínuo do scroll (barra sobe/desce suave)
  useEffect(() => {
    const updateActiveIndex = () => {
      const refs = itemRefs.current.filter(Boolean) as HTMLLIElement[]
      const section = sectionRef.current

      if (section) {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionHeight = rect.height
        const viewportHeight = window.innerHeight
        const scrollY = window.scrollY
        const scrollable = Math.max(sectionHeight - viewportHeight, 1)
        const isMobile = typeof window !== "undefined" && window.innerWidth < 640
        const offset = isMobile ? 24 : 80
        const progress = (scrollY - sectionTop - offset) / scrollable
        setScrollProgress(Math.max(0, Math.min(1, progress)))
      }

      if (refs.length === 0) return
      const viewportMid = window.innerHeight / 2
      let bestIndex = 0
      let bestDist = Infinity
      refs.forEach((el, i) => {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) return
        const elMid = rect.top + rect.height / 2
        const dist = Math.abs(viewportMid - elMid)
        if (dist < bestDist) {
          bestDist = dist
          bestIndex = i
        }
      })
      setActiveTimelineIndex(bestIndex)
    }

    const setup = () => {
      const refs = itemRefs.current.filter(Boolean) as HTMLLIElement[]
      if (refs.length === 0) return null
      return new IntersectionObserver(
        () => {
          // a cada mudança, recalcula qual item está mais próximo do centro (todos os refs)
          updateActiveIndex()
        },
        { root: null, rootMargin: "0px 0px 0px 0px", threshold: [0, 0.1, 0.5, 1] }
      )
    }
    let observer: IntersectionObserver | null = null
    const schedule = () => {
      observer = setup()
      if (observer) {
        const refs = itemRefs.current.filter(Boolean) as HTMLLIElement[]
        refs.forEach((el) => observer!.observe(el))
      }
    }
    schedule()
    if (!observer) {
      const t = requestAnimationFrame(() => {
        schedule()
        if (observer) {
          const refs = itemRefs.current.filter(Boolean) as HTMLLIElement[]
          refs.forEach((el) => observer!.observe(el))
        }
      })
    }
    window.addEventListener("scroll", updateActiveIndex, { passive: true })
    return () => {
      observer?.disconnect()
      window.removeEventListener("scroll", updateActiveIndex)
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#00020C] text-white">
      {/* Hero */}
      <section className="relative h-[420px] sm:h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/via-brasil-home.png"
            alt="Via Brasil Showroom"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 bg-[#3B4055] text-white text-xs sm:text-sm font-semibold rounded-[11px] mb-4 border border-[#3B4055]/50">
              SOBRE NÓS
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              30 Anos de Excelência.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-2 leading-relaxed max-w-xl">
              Mais de 30 anos de história em Ribeirão Preto. Veículos periciados, revisados e com garantia de procedência.
            </p>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              Uma trajetória construída com trabalho constante, visão de crescimento e compromisso com cada cliente.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#00020C] to-transparent pointer-events-none" />
      </section>

      {/* Timeline – janela fixa à esquerda, foto dinâmica à direita */}
      <section
        ref={sectionRef}
        id="linha-do-tempo"
        className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-16 sm:pt-20"
      >
        <motion.p
          className="mb-10 max-w-lg text-center text-2xl font-semibold uppercase leading-normal text-white sm:mb-12 sm:text-3xl sm:text-[42px] sm:leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          Nossa História – Linha do Tempo
        </motion.p>

        <div className="flex w-full items-start gap-8 sm:gap-20">
          <div className="relative flex w-full flex-col pt-[2vh] sm:py-[20vh]">
            {/* Barra de progresso: mais curta, afastada do topo e do fundo do container */}
            <div className="absolute left-0 top-12 bottom-12 w-0.5 sm:top-16 sm:bottom-16">
              <div className="h-full w-full rounded-full bg-white/10" aria-hidden />
              <div
                className="absolute left-0 top-0 w-full rounded-full transition-[height] duration-200 ease-out"
                style={{
                  height: `${scrollProgress * 100}%`,
                  background: "linear-gradient(to bottom, rgb(16 185 129), rgb(251 191 36))",
                }}
                aria-hidden
              />
            </div>
            <ul className="relative flex flex-col gap-12 pl-6 sm:gap-28 sm:pl-8">
              {TIMELINE.map((item, i) => (
                <TimelineItem
                  key={`${item.year}-${item.title}-${i}`}
                  item={item}
                  index={i}
                  isActive={activeTimelineIndex === i}
                  refCallback={(el) => {
                    itemRefs.current[i] = el
                  }}
                />
              ))}
            </ul>
          </div>
          <div className="sticky top-7 flex items-center sm:h-[660px] sm:w-full lg:top-8">
            <div className="relative w-full py-8 sm:py-12">
              {/* Gradiente no topo – conteúdo sumindo para cima */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-16 sm:h-24"
                style={{
                  background: "linear-gradient(to bottom, #00020C 0%, transparent 100%)",
                }}
                aria-hidden
              />
              <div className="relative h-[280px] w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 sm:h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTimelineIndex}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <TimelineImage
                      src={TIMELINE[activeTimelineIndex].image}
                      alt={TIMELINE[activeTimelineIndex].title}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Gradiente embaixo – conteúdo sumindo para baixo */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-16 sm:h-24"
                style={{
                  background: "linear-gradient(to top, #00020C 0%, transparent 100%)",
                }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores + Vídeo */}
      <section className="py-16 md:py-24 bg-[#00020C]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-6">
              {MVV.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    className="p-6 rounded-xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-amber-400" />
                      </div>
                      <h3 className="text-lg font-bold text-amber-400">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                      {item.text}
                    </p>
                  </motion.div>
                )
              })}
            </div>
            <motion.div
              className="relative aspect-video rounded-xl bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white/80 ml-1" />
                </div>
              </div>
              <span className="absolute bottom-4 left-4 right-4 text-center text-sm text-white/50">
                Vídeo em looping da loja
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Time */}
      <section className="pb-16 pt-10 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 bg-[#3B4055] text-white text-xs sm:text-sm font-semibold rounded-[11px] mb-4 border border-[#3B4055]/50">
              NOSSO TIME
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Quem Faz Acontecer.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            {TEAM.map((person, i) => (
              <motion.div
                key={person.name}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/10 border-2 border-white/20 overflow-hidden mb-4">
                  <div className="w-full h-full bg-gradient-to-br from-emerald-500/30 to-amber-500/20 flex items-center justify-center">
                    <Users className="w-10 h-10 text-white/50" />
                  </div>
                </div>
                <h3 className="text-white font-semibold text-sm sm:text-base">
                  {person.name}
                </h3>
                <p className="text-amber-400/90 text-xs sm:text-sm font-medium mt-0.5">
                  {person.role}
                </p>
                <p className="text-white/50 text-xs mt-1">
                  {person.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
