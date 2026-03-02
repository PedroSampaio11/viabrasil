"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function Header() {
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sheetOpen, setSheetOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const term = searchTerm.trim()
    setSearchOpen(false)
    setSearchTerm("")
    if (term) {
      router.push(`/estoque?q=${encodeURIComponent(term)}`)
    } else {
      router.push("/estoque")
    }
  }

  const openSearch = () => {
    setSheetOpen(false)
    setSearchOpen(true)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-[#00020C]/80 backdrop-blur-xl border-b border-white/10"
          : "bg-[#00020C] border-b border-blue-900/20"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center py-4 justify-between">
            {/* Menu Esquerdo - Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="text-white/90 hover:text-white cursor-pointer transition-colors"
                aria-label="Buscar veículos no estoque"
              >
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
                Falar com Consultor
              </button>
            </div>

            {/* Menu Mobile com Sheet */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
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
                  <button
                    type="button"
                    onClick={openSearch}
                    className="w-full flex items-center gap-3 text-white/90 hover:text-white transition-colors text-left py-3 border-b border-white/10"
                  >
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

      {/* Dialog de busca – lupa */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-md border-white/20 bg-[#00020C]">
          <DialogHeader>
            <DialogTitle>Buscar veículos</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Marca, modelo ou ano (ex.: Jetta 2020)"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
              autoFocus
              autoComplete="off"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm uppercase tracking-wide transition-colors flex items-center justify-center gap-2"
            >
              <Search size={18} />
              Ir para estoque
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

