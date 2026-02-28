"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram, MessageCircle, ChevronUp } from "lucide-react"
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/site-config"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-[#00020C] text-white">
      {/* Linha decorativa no topo */}
      <div className="h-px bg-gradient-to-r from-[#034EA2] via-[#00AA56] to-[#FFCC00]" />

      <div className="w-full px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            {/* Coluna 1 - Logo e Contato */}
            <div className="flex flex-col">
              {/* Logo */}
              <div className="mb-6">
                <Image
                  src="/images/logo-viabrasil.png"
                  alt="Via Brasil Automóveis"
                  width={250}
                  height={100}
                  className="mb-4"
                />
              </div>

              {/* Informações de Contato */}
              <div className="space-y-3 text-sm sm:text-base text-white/80 mb-6">
                <p className="flex items-center gap-2">
                  <span>{WHATSAPP_DISPLAY}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>viabrasil@viabrasilautos.com.br</span>
                </p>
                <p className="flex items-start gap-2">
                  <span>
                    Av. Pref. Valdírio Prisco, 396 - Centro, Ribeirão Pires - SP,
                    09400-005
                  </span>
                </p>
              </div>

              {/* Redes Sociais */}
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/viabrasil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-yellow-500 hover:bg-yellow-500/10 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-green-500 hover:bg-green-500/10 transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Coluna 2 - Voltar ao topo e Mapa */}
            <div className="flex flex-col items-end">
              {/* Voltar ao topo */}
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors mb-6 group"
              >
                <span className="text-sm font-medium">Voltar para o topo</span>
                <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </button>

              {/* Mapa - modo escuro via filtro CSS */}
              <div className="w-full h-[300px] md:h-[300px] rounded-[22px] overflow-hidden border border-white/10 [&>iframe]:invert [&>iframe]:hue-rotate-[180deg] [&>iframe]:brightness-95 [&>iframe]:contrast-90">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.5!2d-46.414!3d-23.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce8b8b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sAv.%20Pref.%20Vald%C3%ADrio%20Prisco%2C%20396%20-%20Centro%2C%20Ribeir%C3%A3o%20Pires%20-%20SP%2C%2009400-005!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="Localização Via Brasil Automóveis"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-white/10 my-8" />

          {/* Rodapé inferior */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-white/60">
            {/* Links */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                href="/termos"
                className="hover:text-yellow-500 transition-colors"
              >
                Termos e Condições
              </Link>
              <Link
                href="/privacidade"
                className="hover:text-yellow-500 transition-colors"
              >
                Políticas e Privacidade
              </Link>
            </div>

            {/* Créditos */}
            <div className="text-center md:text-left">
              <span>Desenvolvido por </span>
              <span className="text-yellow-500 font-semibold">FourCoders</span>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              © 2026 - Via Brasil - Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

