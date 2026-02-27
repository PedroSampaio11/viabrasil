"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { VehicleCard } from "@/components/vehicle-card"
import { VehicleInterestForm } from "@/components/vehicle-interest-form"
import { ChevronLeft, ChevronRight, ArrowRight, Loader2 } from "lucide-react"
import { mapVeiculoToCard, mapVeiculoToDetail, VehicleDetailData, VehicleCardData } from "@/lib/utils/vehicle-mapper"
import { getWhatsAppUrl } from "@/lib/utils/whatsapp"
import { VeiculoRetornoModel } from "@/lib/types/autocerto"

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<"descricao" | "opcionais" | "observacoes">("opcionais")
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
    `Ano: ${vehicleData.year} | Km: ${vehicleData.km}`,
    `Preço: ${vehicleData.price}`,
    `Versão: ${vehicleData.version} | Combustível: ${vehicleData.fuel} | Câmbio: ${vehicleData.transmission}`,
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
                  <p className="text-white text-sm sm:text-base font-medium">{vehicleData.plate}</p>
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
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black rounded-[22px] font-bold text-lg sm:text-xl transition-all shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40"
              >
                SOLICITAR CONTATO
              </a>
            </div>

            {/* Coluna Direita - Galeria */}
            <div>
              {/* Imagem Principal */}
              <div className="relative h-[400px] sm:h-[500px] rounded-lg overflow-hidden mb-4 bg-gradient-to-b from-gray-800 to-gray-900">
                <Image
                  src={vehicleData.images[currentImageIndex] || "/images/via-brasil-carro.png"}
                  alt={`${vehicleData.brand} ${vehicleData.model}`}
                  fill
                  className="object-contain p-4"
                  priority
                />
                {/* Navegação */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Thumbnails */}
              {vehicleData.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {vehicleData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === index
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
            </div>
          </div>

          {/* Tabs de Descrição/Opcionais/Observações */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Tabs Laterais */}
              <div className="md:col-span-1">
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab("descricao")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === "descricao"
                      ? "bg-yellow-500/20 text-yellow-500 border-l-4 border-green-500"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    Descrição
                  </button>
                  <button
                    onClick={() => setActiveTab("opcionais")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === "opcionais"
                      ? "bg-yellow-500/20 text-yellow-500 border-l-4 border-green-500"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    Opcionais
                  </button>
                  <button
                    onClick={() => setActiveTab("observacoes")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === "observacoes"
                      ? "bg-yellow-500/20 text-yellow-500 border-l-4 border-green-500"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    Observações Adicionais
                  </button>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="md:col-span-3">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10 min-h-[300px]">
                  {activeTab === "descricao" && (
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                      {vehicleData.description}
                    </p>
                  )}
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
              <Link
                href="/estoque"
                className="px-8 py-4 border-2 border-yellow-500 text-yellow-500 rounded-full font-semibold hover:bg-yellow-500 hover:text-black transition-all text-sm sm:text-base"
              >
                VEJA NOSSO ESTOQUE
              </Link>
            </div>
          </div>

          {/* Formulário de Interesse */}
          <div className="mb-12">
            <VehicleInterestForm codigoVeiculo={parseInt(id)} />
          </div>
        </div>
      </section>
    </div>
  )
}

