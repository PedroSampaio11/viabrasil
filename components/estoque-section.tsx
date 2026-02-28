"use client"

import { useState, useEffect } from "react"
import { VehicleCard } from "./vehicle-card"
import { LearnMoreButton } from "./learn-more-button"
import { mapVeiculoToCard, VehicleCardData } from "@/lib/utils/vehicle-mapper"
import { VeiculoRetornoModel } from "@/lib/types/autocerto"

export function EstoqueSection() {
  const [vehicles, setVehicles] = useState<VehicleCardData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch("/api/veiculos")
        if (response.ok) {
          const data: VeiculoRetornoModel[] = await response.json()
          // Limitar a 3 veículos para a home
          const limitedData = data.slice(0, 3)
          const mappedVehicles = limitedData.map(mapVeiculoToCard)
          setVehicles(mappedVehicles)
        }
      } catch (error) {
        console.error("Erro ao buscar veículos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  return (
    <section className="py-4 sm:py-20 bg-[#00020C]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
            Estoque
          </span>
        </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Mova Sua Paixão
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl">
            Escolha o modelo ideal para o seu estilo de vida.
            O propósito da Via Brasil é ser a melhor escolha em automóveis para
            seus clientes e fazer parte dos momentos especiais da sua vida
          </p>
        </div>

        {/* Grid de Veículos */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#00020C] rounded-lg border-2 border-yellow-500/50 h-[500px] animate-pulse"
              />
            ))}
          </div>
        ) : vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))}
          </div>
        ) : null}

        {/* Botão Ver Mais */}
        <div className="flex justify-center">
          <LearnMoreButton href="/estoque" className="learn-more-accent learn-more-wide">
            Veja nosso estoque
          </LearnMoreButton>
        </div>
      </div>
    </section>
  )
}

