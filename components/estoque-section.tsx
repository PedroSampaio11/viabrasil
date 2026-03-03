"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
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
    <motion.section
      className="py-4 sm:py-20 bg-[#00020C]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
              Estoque
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Mova Sua Paixão
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl">
            Escolha o modelo ideal para o seu estilo de vida.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl">
            O propósito da Via Brasil é ser a melhor escolha em automóveis para
            seus clientes e fazer parte dos momentos especiais da sua vida.
          </p>
        </motion.div>

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
            {vehicles.map((vehicle, i) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <VehicleCard {...vehicle} />
              </motion.div>
            ))}
          </div>
        ) : null}

        {/* Botão Ver Mais */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <LearnMoreButton href="/estoque" className="learn-more-accent learn-more-wide">
            Veja nosso estoque
          </LearnMoreButton>
        </motion.div>
      </div>
    </motion.section>
  )
}

