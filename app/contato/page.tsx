"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "motion/react"
import {
  Mail,
  Phone,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react"
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, WHATSAPP_URL } from "@/lib/site-config"

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: "E-mail",
    value: "viabrasil@viabrasilautos.com.br",
    href: "mailto:viabrasil@viabrasilautos.com.br",
    colorClass: "text-yellow-400",
    bgClass: "bg-yellow-500/10 border-yellow-500/30",
    iconBg: "bg-yellow-500/20",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: WHATSAPP_DISPLAY,
    href: `tel:+${WHATSAPP_NUMBER}`,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-500/10 border-blue-500/30",
    iconBg: "bg-blue-500/20",
  },
  {
    icon: ({ className }: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={className ?? "w-5 h-5"} fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    label: "Instagram",
    value: "@viabrasilautomoveis_",
    href: "https://www.instagram.com/viabrasilautomoveis_/",
    colorClass: "text-orange-400",
    bgClass: "bg-orange-500/10 border-orange-500/30",
    iconBg: "bg-orange-500/20",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    href: WHATSAPP_URL,
    colorClass: "text-green-400",
    bgClass: "bg-green-500/10 border-green-500/30",
    iconBg: "bg-green-500/20",
  },
]

const ADDRESS = "Av. Pref. Valdírio Prisco, 396 - Centro, Ribeirão Pires - SP, 09400-005"
const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.075022557!2d-46.414406!3d-23.710539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce8f2b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sAv.%20Pref.%20Vald%C3%ADrio%20Prisco%2C%20396%20-%20Centro%2C%20Ribeir%C3%A3o%20Pires%20-%20SP%2C%2009400-005!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"

export default function ContatoPage() {
  const [copied, setCopied] = useState(false)
  const [formState, setFormState] = useState({
    nome: "",
    sobrenome: "",
    assunto: "",
    mensagem: "",
  })

  const copyAddress = () => {
    navigator.clipboard.writeText(ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: integrar com API ou e-mail
  }

  return (
    <main className="min-h-screen bg-[#00020C] text-white">
      {/* Hero – igual à home */}
      <section className="relative h-[300px] sm:h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/VendaIMG.png"
            alt="Interior Via Brasil"
            fill
            quality={100}
            unoptimized
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-24 sm:pb-32">
          <span className="inline-block rounded-full w-fit border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-4">
            Contato
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Fale com a Via Brasil
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00020C] to-transparent pointer-events-none" />
      </section>

      {/* Form + Contact cards – alinhado ao título, mais largo */}
      <section className="container mx-auto px-4 -mt-12 sm:-mt-16 relative z-10 pb-24">
        {/* Borda com gradiente em todo o contorno (igual ao do site) */}
        <motion.div
          className="max-w-7xl w-full mx-auto rounded-2xl p-[1px]"
          style={{
            background: "linear-gradient(135deg, rgb(37 99 235), rgb(34 197 94), rgb(234 179 8), rgb(37 99 235))",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="rounded-2xl bg-[#00020C]/95 backdrop-blur border border-white/5 p-4 sm:p-12 lg:p-16 xl:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 xl:gap-32">
              {/* Formulário */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="nome" className="sr-only">
                      Nome
                    </label>
                    <input
                      id="nome"
                      type="text"
                      placeholder="Nome"
                      value={formState.nome}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, nome: e.target.value }))
                      }
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="sobrenome" className="sr-only">
                      Sobrenome
                    </label>
                    <input
                      id="sobrenome"
                      type="text"
                      placeholder="Sobrenome"
                      value={formState.sobrenome}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, sobrenome: e.target.value }))
                      }
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="assunto" className="sr-only">
                    Assunto
                  </label>
                  <input
                    id="assunto"
                    type="text"
                    placeholder="Assunto"
                    value={formState.assunto}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, assunto: e.target.value }))
                    }
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="mensagem" className="sr-only">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    rows={5}
                    placeholder="Digite aqui a mensagem que deseja enviar..."
                    value={formState.mensagem}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, mensagem: e.target.value }))
                    }
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-colors resize-y min-h-[120px]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm uppercase tracking-wide transition-colors"
                >
                  ENVIAR
                </button>
              </form>

              {/* Cards de contato – 2x2, borda sutil, ícone no canto */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {CONTACT_CARDS.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`flex flex-col p-5 rounded-xl border border-white/20 bg-white/5 ${item.bgClass} hover:opacity-90 transition-opacity`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg ${item.iconBg} flex items-center justify-center mb-3 ${item.colorClass}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-sm font-semibold ${item.colorClass}`}>
                        {item.label}
                      </span>
                      <span className="text-xs text-white/70 mt-1 line-clamp-2">
                        {item.value}
                      </span>
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Endereço + mapa – lado a lado, mapa maior */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col lg:flex-row lg:items-stretch gap-6">
                <div className="flex items-start gap-3 lg:min-w-0 lg:flex-1 lg:max-w-md">
                  <div>
                    <p className="font-bold text-white mb-1">Endereço</p>
                    <p className="text-white/80 text-sm sm:text-base">
                      {ADDRESS}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={copyAddress}
                    className="flex-shrink-0 p-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors text-white/70 hover:text-white cursor-pointer"
                    aria-label="Copiar endereço"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="relative w-full lg:flex-1 min-h-[220px] sm:min-h-[280px] lg:min-h-[260px] rounded-xl overflow-hidden border border-white/20 [&>iframe]:invert [&>iframe]:hue-rotate-[180deg] [&>iframe]:brightness-95 [&>iframe]:contrast-90">
                  <iframe
                    src={MAPS_EMBED}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "220px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização Via Brasil Automóveis"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
