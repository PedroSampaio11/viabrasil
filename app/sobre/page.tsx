"use client"

import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Target,
  Eye,
  Heart,
  X,
} from "lucide-react"
import { MarqueeDraggable } from "@/components/ui/marquee-draggable"

// Nomes reais dos arquivos em public/images/sobre/ (com espaços e caracteres especiais)
const SOBRE_IMAGES = [
  "2009 Uma das primeiras faixadas da Via Brasil (Primeiro registro)_.webp",
  "2012 Nova faixada + expansão_.webp",
  "2014 Nova faixada + expansão 2_.webp",
  "2021 Reforma finalizada_.webp",
  "2023 Expansão.webp",
  "2025 Reforma calçada_.webp",
  "loja.webp",
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
  {
    year: "2026",
    title: "Loja Atualizada para Você",
    body: "Loja atualizada e repleta de novidades para atender vocês. A Via Brasil segue evoluindo para oferecer o melhor em compra e venda de veículos, com estrutura moderna e um time pronto para recebê-lo.",
    image: "/images/sobre/" + encodeURIComponent(SOBRE_IMAGES[6]),
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

// Fotos em public/images/equipe (nomes com espaços/caracteres especiais)
const TEAM = [
  { name: "Gilson", role: "CEO", desc: "Liderança e visão estratégica.", image: "Gilson - Ceo .jpg" },
  { name: "Ricardo", role: "Gerente", desc: "Operações e relacionamento.", image: "Ricardo - Gerente .jpg" },
  { name: "Lorenzo", role: "Administração", desc: "Gestão financeira e estratégica.", image: "Lorenzo - administração .jpg" },
  { name: "Diego", role: "Vendas", desc: "Consultoria e negociação.", image: "Diego - vendas.jpg" },
  { name: "Elisandro", role: "Vendas", desc: "Consultoria e negociação.", image: "Elisandro - vendas.jpg" },
  { name: "Junior", role: "Vendas", desc: "Consultoria e negociação.", image: "Junior - vendas.jpg" },
  { name: "Murillo", role: "Marketing", desc: "Comunicação e divulgação.", image: "Murillo - Marketing .jpg" },
  { name: "Marcos", role: "Manutenção", desc: "Manutenção dos veículos.", image: "Marcos - manutenção .jpg" },
  { name: "Guilherme", role: "Higienização", desc: "Higienização dos veículos.", image: "Guilherme - Higienização dos veículos .jpg" },
  { name: "Jonas", role: "Higienização", desc: "Higienização dos veículos.", image: "Jonas - Higienização dos veículos .jpg" },
  { name: "Rosângela", role: "Limpeza", desc: "Limpeza e organização.", image: "Rosângela - limpeza .jpg" },
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
        className={`inline-block w-fit rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${isActive
          ? "border-white/20 bg-white/10 text-[#CBD5E1]"
          : "border-white/10 bg-white/5 text-white/50"
          }`}
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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [timelineSectionInView, setTimelineSectionInView] = useState(true)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => setTimelineSectionInView(entry.isIntersecting),
      { root: null, rootMargin: "0px", threshold: 0 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false)
    }
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [lightboxOpen])

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
            src="/images/ViaIMG.png"
            alt="Via Brasil Showroom"
            fill
            quality={100}
            unoptimized
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center">
          <div className="max-w-2xl space-y-5 sm:space-y-6 md:space-y-7">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
              NOSSA HISTÓRIA
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight pr-2">
              30 Anos elevando o padrão em Ribeirão Pires.
            </h1>
            <div className="max-w-xl space-y-4 sm:space-y-5">
              <p className="text-base sm:text-lg text-white/90 sm:max-w-[500px] leading-snug sm:leading-normal">
                Não vendemos apenas carros, entregamos tranquilidade. Nossa trajetória de três décadas foi construída sobre três pilares: transparência absoluta, procedência rigorosa e um compromisso inabalável com a sua segurança.
              </p>
              <p className="text-base sm:text-lg text-white/80 sm:max-w-[500px] leading-snug sm:leading-normal">
                Uma trajetória construída com trabalho constante, visão de crescimento e compromisso com cada cliente.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 sm:h-10 bg-gradient-to-t from-[#00020C] to-transparent pointer-events-none" />
      </section>

      {/* Timeline – janela fixa à esquerda, foto dinâmica à direita */}
      <section
        ref={sectionRef}
        id="linha-do-tempo"
        className="mx-auto sm:mt-0 flex w-full max-w-7xl flex-col items-center px-4 sm:pt-20"
      >
        <motion.p
          className="mb-10 max-w-lg text-center text-2xl font-semibold uppercase leading-normal text-white sm:mb-12 sm:text-3xl sm:text-[42px] sm:leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          Nossa Jornada em Destaque.
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
          <div className="hidden sm:flex sticky top-7 items-center sm:h-[660px] sm:w-full lg:top-8">
            <div
              className="relative w-full py-8 sm:py-12 transition-transform duration-150 ease-out"
              style={{ transform: `translateY(-${scrollProgress * 48}px)` }}
            >
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

        {/* Mobile: preview flutuante + lightbox */}
        <div className="sm:hidden">
          <AnimatePresence>
            {timelineSectionInView && (
              <motion.button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="fixed bottom-6 right-6 z-40 w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 bg-white/5 shadow-lg shadow-black/40 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#00020C]"
                aria-label={`Ver foto: ${TIMELINE[activeTimelineIndex].title}`}
                animate={{ y: [0, -8, 0], opacity: 1 }}
                transition={{
                  y: { duration: 1.8, repeat: Infinity, repeatType: "reverse" },
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTimelineIndex}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={TIMELINE[activeTimelineIndex].image}
                      alt={TIMELINE[activeTimelineIndex].title}
                      fill
                      className="object-cover"
                      sizes="80px"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        if (target?.src !== TIMELINE_IMAGE_FALLBACK) target.src = TIMELINE_IMAGE_FALLBACK
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
                onClick={() => setLightboxOpen(false)}
                role="dialog"
                aria-modal="true"
                aria-label="Foto da timeline"
              >
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label="Fechar"
                >
                  <X className="w-6 h-6" />
                </button>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full max-w-lg flex-1 flex flex-col items-center justify-center gap-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="inline-block w-fit rounded-full border border-white/20 bg-white/10 text-[#CBD5E1] px-4 py-2 text-xs font-semibold uppercase tracking-wider">
                    {TIMELINE[activeTimelineIndex].year}
                  </span>
                  <h3 className="text-xl font-bold text-amber-400 text-center sm:text-2xl">
                    {TIMELINE[activeTimelineIndex].title}
                  </h3>
                  {/* <p className="text-sm leading-relaxed text-white/90 text-center sm:text-base">
                    {TIMELINE[activeTimelineIndex].body}
                  </p> */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                    <Image
                      src={TIMELINE[activeTimelineIndex].image}
                      alt={TIMELINE[activeTimelineIndex].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 512px"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        if (target?.src !== TIMELINE_IMAGE_FALLBACK) target.src = TIMELINE_IMAGE_FALLBACK
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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
                    className="p-6 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 ease-out hover:scale-[1.02] hover:backdrop-blur-md cursor-default"
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
              className="relative aspect-video rounded-xl bg-black border border-white/10 overflow-hidden"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
            >
              <video
                src="/video/viabrasil.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                aria-label="Vídeo da loja Via Brasil"
              />
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
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-4">
              Nosso time
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Quem Faz Acontecer.
            </h2>
          </motion.div>

          <div className="w-full overflow-hidden">
            <MarqueeDraggable speed={40} pauseOnHover gap="1.5rem" className="py-2">
              {TEAM.map((person, i) => (
                <div
                  key={`${person.name}-${i}`}
                  className="group w-64 shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/5">
                    <Image
                      src={"/images/equipe/" + encodeURIComponent(person.image)}
                      alt={person.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="256px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-white font-semibold text-sm sm:text-base">
                      {person.name}
                    </h3>
                    <p className="text-amber-400/90 text-xs sm:text-sm font-medium mt-0.5">
                      {person.role}
                    </p>
                    <p className="text-white/50 text-xs mt-1 leading-snug">
                      {person.desc}
                    </p>
                  </div>
                </div>
              ))}
            </MarqueeDraggable>
          </div>
        </div>
      </section>
    </main>
  )
}
