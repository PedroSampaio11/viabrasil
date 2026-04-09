"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { VehicleCard } from "@/components/vehicle-card"
import { VehicleInterestForm } from "@/components/vehicle-interest-form"
import { LearnMoreButton } from "@/components/learn-more-button"
import { ChevronLeft, ChevronRight, ArrowRight, Loader2, X } from "lucide-react"
import { mapVeiculoToCard, mapVeiculoToDetail, VehicleDetailData, VehicleCardData } from "@/lib/utils/vehicle-mapper"
import { getWhatsAppUrl } from "@/lib/utils/whatsapp"
import { VeiculoRetornoModel } from "@/lib/types/autocerto"

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"opcionais" | "observacoes">("opcionais")
  const [vehicleData, setVehicleData] = useState<VehicleDetailData | null>(null)
  const [otherVehicles, setOtherVehicles] = useState<VehicleCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar veículo e outros veículos
  useEffect(() => {
    async function fetchVehicle() {
      try {
        setLoading(true)
        setError(null)

        // Buscar veículo
        const vehicleResponse = await fetch(`/api/veiculos/${id}`)
        if (!vehicleResponse.ok) {
          if (vehicleResponse.status === 404) {
            throw new Error("Veículo não encontrado")
          }
          throw new Error("Erro ao buscar veículo")
        }

        const veiculo: VeiculoRetornoModel = await vehicleResponse.json()
        const mappedVehicle = mapVeiculoToDetail(veiculo)
        setVehicleData(mappedVehicle)

        // Resetar índice de imagem quando mudar o veículo
        setCurrentImageIndex(0)

        // Buscar outros veículos (excluindo o atual)
        const estoqueResponse = await fetch("/api/veiculos")
        if (estoqueResponse.ok) {
          const estoque: VeiculoRetornoModel[] = await estoqueResponse.json()
          const outros = estoque
            .filter((v) => v.Codigo.toString() !== id)
            .slice(0, 3)
            .map(mapVeiculoToCard)
          setOtherVehicles(outros)
        }
      } catch (err: any) {
        console.error("Erro ao buscar veículo:", err)
        setError(err.message || "Erro ao carregar veículo")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchVehicle()
    }
  }, [id])

  const nextImage = () => {
    if (vehicleData) {
      setCurrentImageIndex((prev) => (prev + 1) % vehicleData.images.length)
    }
  }

  const prevImage = () => {
    if (vehicleData) {
      setCurrentImageIndex((prev) => (prev - 1 + vehicleData.images.length) % vehicleData.images.length)
    }
  }

  const openViewer = (index?: number) => {
    if (index !== undefined) setCurrentImageIndex(index)
    setViewerOpen(true)
  }

  useEffect(() => {
    if (!viewerOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewerOpen(false)
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "ArrowRight") nextImage()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [viewerOpen, currentImageIndex])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#00020C] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
      </div>
    )
  }

  if (error || !vehicleData) {
    return (
      <div className="min-h-screen bg-[#00020C] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error || "Veículo não encontrado"}</p>
          <Link
            href="/estoque"
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full font-semibold transition-colors"
          >
            Voltar para o estoque
          </Link>
        </div>
      </div>
    )
  }

  const whatsappMessage = [
    "Olá! Tenho interesse no veículo:",
    "",
    `*${vehicleData.brand} ${vehicleData.model}*`,
    `Ano: ${vehicleData.year}`,
    `Versão: ${vehicleData.version} `,
    "",
    "Gostaria de mais informações ou agendar uma visita.",
  ].join("\n")

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ""
  const fullMessage = baseUrl
    ? `${whatsappMessage}\n\nLink do anúncio: ${baseUrl}/estoque/${id}`
    : whatsappMessage

  return (
    <div className="min-h-screen bg-[#00020C]">
      <section className="py-8 sm:py-12 bg-[#00020C]">
        <div className="container mx-auto px-4">
          {/* Informações Principais */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Coluna Esquerda - Informações */}
            <div>
              {/* Marca e Modelo */}
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                  <span className="text-yellow-500">{vehicleData.brand}</span>{" "}
                  <span className="text-white">{vehicleData.model}</span>
                </h1>
              </div>

              {/* Ano e KM */}
              <div className="flex flex-wrap gap-4 mb-6 text-white/80 text-sm sm:text-base">
                <span>
                  <strong className="text-white">Ano:</strong> {vehicleData.year}
                </span>
                <span>
                  <strong className="text-white">Km:</strong> {vehicleData.km}
                </span>
              </div>

              {/* Preço */}
              <div className="mb-8">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500">
                  {vehicleData.price}
                </p>
              </div>

              {/* Especificações Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/60 text-xs sm:text-sm mb-1">Versão</p>
                  <p className="text-white text-sm sm:text-base font-medium">{vehicleData.version}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/60 text-xs sm:text-sm mb-1">Combustível</p>
                  <p className="text-white text-sm sm:text-base font-medium">{vehicleData.fuel}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/60 text-xs sm:text-sm mb-1">Placa</p>
                  <p className="text-white text-sm sm:text-base font-medium">{vehicleData.plate ? vehicleData.plate.replace(/^.{3}/, '***') : '—'}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/60 text-xs sm:text-sm mb-1">Câmbio</p>
                  <p className="text-white text-sm sm:text-base font-medium">{vehicleData.transmission}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/60 text-xs sm:text-sm mb-1">Porta</p>
                  <p className="text-white text-sm sm:text-base font-medium">{vehicleData.doors}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/60 text-xs sm:text-sm mb-1">Modelo</p>
                  <p className="text-white text-sm sm:text-base font-medium">{vehicleData.vehicleModel}</p>
                </div>
              </div>

              {/* Botão CTA - abre WhatsApp com mensagem formatada */}
              <a
                href={getWhatsAppUrl(fullMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir WhatsApp para solicitar contato sobre este veículo"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-yellow-500 hover:bg-yellow-400/95 text-black rounded-[22px] font-bold text-lg sm:text-xl transition-colors duration-200"
              >
                SOLICITAR CONTATO
              </a>
            </div>

            {/* Coluna Direita – só a imagem principal (clique abre visualizador) */}
            <div>
              <div
                className="relative min-h-[360px] h-[450px] sm:h-[520px] rounded-lg overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 cursor-zoom-in"
                onClick={() => openViewer()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openViewer()}
                aria-label="Ampliar foto"
              >
                <Image
                  src={vehicleData.images[currentImageIndex] || "/images/via-brasil-carro.png"}
                  alt={`${vehicleData.brand} ${vehicleData.model}`}
                  fill
                  className="object-cover object-center pointer-events-none"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prevImage() }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); nextImage() }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnails – linha completa em baixo, sem buraco na esquerda */}
          {vehicleData.images.length > 0 && (
            <div className="mt-6 mb-10 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {vehicleData.images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => openViewer(index)}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-zoom-in ${currentImageIndex === index
                    ? "border-yellow-500"
                    : "border-white/20 hover:border-white/40"
                    }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Tabs Opcionais e Observações */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Tabs Laterais */}
              <div className="md:col-span-1">
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab("opcionais")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === "opcionais"
                      ? "bg-yellow-500/20 text-yellow-500 border-l-4 border-yellow-500"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    Opcionais
                  </button>
                  <button
                    onClick={() => setActiveTab("observacoes")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === "observacoes"
                      ? "bg-yellow-500/20 text-yellow-500 border-l-4 border-yellow-500"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    Observações adicionais
                  </button>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="md:col-span-3">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10 min-h-[300px]">
                  {activeTab === "opcionais" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {vehicleData.optionals.map((optional, index) => (
                        <div key={index} className="flex items-center gap-2 text-white/80 text-sm sm:text-base">
                          <span className="text-yellow-500">•</span>
                          <span>{optional}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === "observacoes" && (
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                      {vehicleData.observations}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Veja outros modelos */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Veja outros modelos
            </h2>
            {otherVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {otherVehicles.map((vehicle) => (
                  <Link key={vehicle.id} href={`/estoque/${vehicle.id}`}>
                    <div className="group relative">
                      <VehicleCard {...vehicle} />
                      <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-5 h-5 text-black" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-white/60 text-center py-8">Nenhum outro veículo disponível no momento.</p>
            )}
            <div className="flex justify-center">
              <LearnMoreButton href="/estoque" className="learn-more-accent learn-more-wide">
                Veja nosso estoque
              </LearnMoreButton>
            </div>
          </div>

          {/* Formulário de Interesse */}
          <div className="mb-12">
            <VehicleInterestForm codigoVeiculo={parseInt(id)} />
          </div>
        </div>
      </section>

      {/* Visualizador de fotos (lightbox) */}
      {viewerOpen && vehicleData && vehicleData.images.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm animate-in fade-in-0 duration-200"
          onClick={() => setViewerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Galeria de fotos"
        >
          {/* Top bar: fechar + contador */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
            <span className="text-white/80 text-sm sm:text-base font-medium">
              {currentImageIndex + 1} / {vehicleData.images.length}
            </span>
            <button
              type="button"
              onClick={() => setViewerOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Área da imagem – clique não fecha (só no backdrop) */}
          <div
            className="flex-1 flex items-center justify-center min-h-0 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-6xl max-h-[80vh] flex items-center justify-center">
              <Image
                src={vehicleData.images[currentImageIndex]}
                alt={`${vehicleData.brand} ${vehicleData.model} - Foto ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                onClick={(e) => e.stopPropagation()}
              />
              {/* Setas de navegação */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prevImage() }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-yellow-500/90 text-white hover:text-black flex items-center justify-center transition-all"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); nextImage() }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-yellow-500/90 text-white hover:text-black flex items-center justify-center transition-all"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
              </button>
            </div>
          </div>

          {/* Thumbnails em miniatura na parte de baixo */}
          <div className="flex gap-2 overflow-x-auto px-4 py-3 sm:px-6 sm:py-4 justify-center border-t border-white/10">
            {vehicleData.images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index) }}
                className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all flex items-center justify-center ${currentImageIndex === index ? "border-yellow-500 ring-2 ring-yellow-500/50" : "border-white/20 hover:border-white/50"}`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

