"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  return (
    <>
      <header className="w-full bg-[#00020C] border-b border-blue-900/20 relative z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center py-4 justify-between">
            {/* Menu Esquerdo - Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <button className="text-white/90 hover:text-white transition-colors">
                <Search size={20} />
              </button>
              <Link
                href="/estoque"
                className="text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                Estoque
              </Link>
              <Link
                href="/venda"
                className="text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                Venda seu Veículo
              </Link>
            </nav>

            {/* Logo - Mobile */}
            <div className="md:hidden">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo-viabrasil.png"
                  alt="Via Brasil Automóveis"
                  width={150}
                  height={45}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Logo Centro - Desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="flex items-center justify-center">
                <Image
                  src="/images/logo-viabrasil.png"
                  alt="Via Brasil Automóveis"
                  width={200}
                  height={60}
                  className="h-12 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Menu Direito - Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/sobre"
                className="text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                Sobre
              </Link>
              <Link
                href="/contato"
                className="text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                Contato
              </Link>
              <button
                className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-semibold transition-colors shadow-lg shadow-green-500/20"
              >
                FALE COM CONSULTOR
              </button>
            </div>

            {/* Menu Mobile com Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="md:hidden text-white/90 hover:text-white transition-colors p-2"
                  aria-label="Menu"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#00020C] border-l border-blue-900/20">
                <nav className="space-y-4 mt-8">
                  {/* Busca */}
                  <button className="w-full flex items-center gap-3 text-white/90 hover:text-white transition-colors text-left py-3 border-b border-white/10">
                    <Search size={20} />
                    <span className="text-sm font-medium">Buscar</span>
                  </button>

                  {/* Links */}
                  <Link
                    href="/estoque"
                    className="block text-white/90 hover:text-white transition-colors text-base font-medium py-3 border-b border-white/10"
                  >
                    Estoque
                  </Link>
                  <Link
                    href="/venda"
                    className="block text-white/90 hover:text-white transition-colors text-base font-medium py-3 border-b border-white/10"
                  >
                    Venda seu Veículo
                  </Link>
                  <Link
                    href="/sobre"
                    className="block text-white/90 hover:text-white transition-colors text-base font-medium py-3 border-b border-white/10"
                  >
                    Sobre
                  </Link>
                  <Link
                    href="/contato"
                    className="block text-white/90 hover:text-white transition-colors text-base font-medium py-3 border-b border-white/10"
                  >
                    Contato
                  </Link>

                  {/* Botão CTA */}
                  <button
                    className="w-full mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-semibold transition-colors shadow-lg shadow-green-500/20"
                  >
                    FALE COM CONSULTOR
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}

