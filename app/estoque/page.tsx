"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { VehicleCard } from "@/components/vehicle-card"
import { VehicleInterestForm } from "@/components/vehicle-interest-form"
import { Search, Filter, X } from "lucide-react"
import { mapVeiculoToCard, VehicleCardData } from "@/lib/utils/vehicle-mapper"
import { VeiculoRetornoModel, MarcaModel, ModeloModel } from "@/lib/types/autocerto"
import { SelectSearchable } from "@/components/ui/select-searchable"
import { Skeleton } from "@/components/ui/skeleton"
import { VehicleCardSkeleton } from "@/components/vehicle-card-skeleton"
import { LearnMoreButton } from "@/components/learn-more-button"

interface FilterState {
  marca: string
  modelo: string
  anoDe: string
  anoAte: string
  precoDe: string
  precoAte: string
}

interface SearchFormData {
  searchQuery: string
}

export default function EstoquePage() {
  const { register, handleSubmit, watch, reset } = useForm<SearchFormData>({
    defaultValues: {
      searchQuery: "",
    },
  })

  const searchQuery = watch("searchQuery")
  const [activeSearchQuery, setActiveSearchQuery] = useState("")
  const [searching, setSearching] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [vehicles, setVehicles] = useState<VehicleCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [filtering, setFiltering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [allVehicles, setAllVehicles] = useState<VeiculoRetornoModel[]>([])
  const [marcas, setMarcas] = useState<MarcaModel[]>([])
  const [modelos, setModelos] = useState<ModeloModel[]>([])
  const [loadingMarcas, setLoadingMarcas] = useState(false)
  const [loadingModelos, setLoadingModelos] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    marca: "",
    modelo: "",
    anoDe: "",
    anoAte: "",
    precoDe: "",
    precoAte: "",
  })

  // Buscar marcas
  useEffect(() => {
    async function fetchMarcas() {
      try {
        setLoadingMarcas(true)
        const response = await fetch("/api/filtros/marcas?tipo=1")
        if (response.ok) {
          const data: MarcaModel[] = await response.json()
          setMarcas(data)
        }
      } catch (err) {
        console.error("Erro ao buscar marcas:", err)
      } finally {
        setLoadingMarcas(false)
      }
    }
    fetchMarcas()
  }, [])

  // Buscar modelos quando marca for selecionada
  useEffect(() => {
    async function fetchModelos() {
      if (!filters.marca) {
        setModelos([])
        return
      }

      try {
        setLoadingModelos(true)
        const response = await fetch(`/api/filtros/modelos?codigoMarca=${filters.marca}`)
        if (response.ok) {
          const data: ModeloModel[] = await response.json()
          setModelos(data)
        }
      } catch (err) {
        console.error("Erro ao buscar modelos:", err)
      } finally {
        setLoadingModelos(false)
      }
    }
    fetchModelos()
  }, [filters.marca])

  // Buscar veículos da API com filtros
  useEffect(() => {
    async function fetchVehicles() {
      try {
        // Só mostra loading completo na primeira carga
        if (allVehicles.length === 0) {
          setLoading(true)
        } else {
          setFiltering(true)
        }
        setError(null)

        // Construir query string com filtros
        const params = new URLSearchParams()
        if (filters.marca) params.append("IdMarca", filters.marca)
        if (filters.modelo) params.append("IdModelo", filters.modelo)
        if (filters.anoDe) params.append("anoDe", filters.anoDe)
        if (filters.anoAte) params.append("anoAte", filters.anoAte)
        if (filters.precoDe) params.append("precoDe", filters.precoDe)
        if (filters.precoAte) params.append("precoAte", filters.precoAte)

        const queryString = params.toString()
        const url = `/api/veiculos${queryString ? `?${queryString}` : ""}`
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error("Erro ao buscar veículos")
        }

        const data: VeiculoRetornoModel[] = await response.json()
        setAllVehicles(data)

        // Aplicar busca local se houver busca ativa, senão mostrar todos
        if (activeSearchQuery.trim()) {
          const query = activeSearchQuery.toLowerCase()
          const searchTerms = query.split(/\s+/).filter(term => term.length > 0)
          const filtered = data.filter((veiculo) => {
            const marcaLower = veiculo.Marca.toLowerCase()
            const modeloLower = veiculo.Modelo.toLowerCase()
            const versaoLower = veiculo.Versao?.toLowerCase() || ""
            const fullName = `${marcaLower} ${modeloLower}`

            return searchTerms.every(term =>
              marcaLower.includes(term) ||
              modeloLower.includes(term) ||
              versaoLower.includes(term) ||
              fullName.includes(term)
            )
          })
          const mappedVehicles = filtered.map(mapVeiculoToCard)
          setVehicles(mappedVehicles)
        } else {
          const mappedVehicles = data.map(mapVeiculoToCard)
          setVehicles(mappedVehicles)
        }
      } catch (err) {
        console.error("Erro ao buscar veículos:", err)
        setError("Não foi possível carregar os veículos. Tente novamente mais tarde.")
      } finally {
        setLoading(false)
        setFiltering(false)
      }
    }

    fetchVehicles()
  }, [filters.marca, filters.modelo, filters.anoDe, filters.anoAte, filters.precoDe, filters.precoAte, activeSearchQuery])

  // Filtrar veículos por busca local (após carregar da API) - Busca apenas no botão
  useEffect(() => {
    if (!activeSearchQuery.trim()) {
      const mappedVehicles = allVehicles.map(mapVeiculoToCard)
      setVehicles(mappedVehicles)
      setSearching(false)
      return
    }

    setSearching(true)

    // Processar busca de forma assíncrona mas mostrar skeleton imediatamente
    const query = activeSearchQuery.toLowerCase().trim()

    // Otimização: dividir termos de busca
    const searchTerms = query.split(/\s+/).filter(term => term.length > 0)

    // Usar setTimeout para não bloquear a UI e garantir mínimo de 1 segundo de skeleton
    const startTime = Date.now()
    const timeoutId = setTimeout(() => {
      const filtered = allVehicles.filter((veiculo) => {
        const marcaLower = veiculo.Marca.toLowerCase()
        const modeloLower = veiculo.Modelo.toLowerCase()
        const versaoLower = veiculo.Versao?.toLowerCase() || ""
        const fullName = `${marcaLower} ${modeloLower}`

        // Busca otimizada: verifica se todos os termos estão presentes
        return searchTerms.every(term =>
          marcaLower.includes(term) ||
          modeloLower.includes(term) ||
          versaoLower.includes(term) ||
          fullName.includes(term)
        )
      })

      const mappedVehicles = filtered.map(mapVeiculoToCard)

      // Garantir que o skeleton apareça por pelo menos 1 segundo
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, 1000 - elapsedTime)

      setTimeout(() => {
        setVehicles(mappedVehicles)
        setSearching(false)
      }, remainingTime)
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [activeSearchQuery, allVehicles])

  const handleSearch = (data: SearchFormData) => {
    // Executar busca apenas quando clicar no botão
    setActiveSearchQuery(data.searchQuery)
  }

  const clearSearch = () => {
    reset({ searchQuery: "" })
    setActiveSearchQuery("")
    setSearching(false)
  }

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value }
      // Limpar modelo se marca mudar
      if (key === "marca" && value !== prev.marca) {
        newFilters.modelo = ""
      }
      return newFilters
    })
  }

  const clearFilters = () => {
    setFilters({
      marca: "",
      modelo: "",
      anoDe: "",
      anoAte: "",
      precoDe: "",
      precoAte: "",
    })
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  return (
    <div className="min-h-screen bg-[#00020C]">
      <section className="py-8 sm:py-12 bg-[#00020C]">
        <div className="container mx-auto px-4">
          {/* Título */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Nossos Veículos
            </h1>
          </div>

          {/* Barra de Busca e Filtros */}
          <div className="mb-8">
            <form onSubmit={handleSubmit(handleSearch)} className="flex flex-row gap-2 sm:gap-4 items-center mb-4">
              {/* Input de Busca */}
              <div className="flex-1 min-w-0 relative">
                <div className="relative">
                  <Search className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/40" />
                  <input
                    type="text"
                    {...register("searchQuery")}
                    placeholder="Digite e aperte para buscar (ex.: Jetta GLI 2020)"
                    className="w-full pl-8 sm:pl-12 pr-2 sm:pr-4 py-2 sm:py-4 bg-white/7 border border-white/20 rounded-[22px] text-white placeholder-white/40 focus:outline-none focus:border-yellow-500 transition-colors text-xs sm:text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Botão Buscar */}
              <button
                type="submit"
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 md:px-8 py-2 sm:py-4 bg-yellow-500 hover:bg-yellow-600 text-black rounded-[22px] font-bold text-xs sm:text-sm md:text-base transition-all shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 whitespace-nowrap flex-shrink-0"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Buscar</span>
              </button>

              {/* Botão Filtro */}
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${hasActiveFilters
                  ? "bg-yellow-500/20 border-yellow-500 hover:bg-yellow-500/30"
                  : "bg-white/7 border-white/20 hover:border-yellow-500 hover:bg-white/10"
                  }`}
                aria-label="Filtros"
              >
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>

              {/* Botão Limpar */}
              {(searchQuery || hasActiveFilters) && (
                <button
                  type="button"
                  onClick={() => {
                    clearSearch()
                    clearFilters()
                  }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/7 border border-white/20 flex items-center justify-center hover:border-red-500 hover:bg-red-500/10 transition-all flex-shrink-0"
                  aria-label="Limpar busca e filtros"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              )}
            </form>

            {/* Painel de Filtros */}
            {showFilters && (
              <div className="bg-white/5 border border-white/20 rounded-[22px] p-4 sm:p-6 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Marca */}
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Marca</label>
                    {loadingMarcas ? (
                      <Skeleton className="h-10 w-full rounded-lg" />
                    ) : (
                      <SelectSearchable
                        options={[
                          { value: "all", label: "Todas as marcas" },
                          ...marcas.map((marca) => ({
                            value: marca.Codigo.toString(),
                            label: marca.Descricao,
                          })),
                        ]}
                        value={filters.marca || undefined}
                        onValueChange={(value) => handleFilterChange("marca", value === "all" ? "" : value)}
                        placeholder="Todas as marcas"
                        searchPlaceholder="Buscar marca..."
                        emptyMessage="Nenhuma marca encontrada"
                        disabled={loadingMarcas}
                      />
                    )}
                  </div>

                  {/* Modelo */}
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Modelo</label>
                    {loadingModelos ? (
                      <Skeleton className="h-10 w-full rounded-lg" />
                    ) : (
                      <SelectSearchable
                        options={[
                          { value: "all", label: "Todos os modelos" },
                          ...modelos.map((modelo) => ({
                            value: modelo.Codigo.toString(),
                            label: modelo.Descricao,
                          })),
                        ]}
                        value={filters.modelo || undefined}
                        onValueChange={(value) => handleFilterChange("modelo", value === "all" ? "" : value)}
                        placeholder="Todos os modelos"
                        searchPlaceholder="Buscar modelo..."
                        emptyMessage="Nenhum modelo encontrado"
                        disabled={!filters.marca || loadingModelos}
                      />
                    )}
                  </div>

                  {/* Ano De */}
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Ano De</label>
                    <input
                      type="number"
                      value={filters.anoDe}
                      onChange={(e) => handleFilterChange("anoDe", e.target.value)}
                      placeholder="Ex: 2020"
                      min="1900"
                      max="2100"
                      className="w-full px-4 py-2 bg-white/7 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-500 transition-colors text-sm"
                    />
                  </div>

                  {/* Ano Até */}
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Ano Até</label>
                    <input
                      type="number"
                      value={filters.anoAte}
                      onChange={(e) => handleFilterChange("anoAte", e.target.value)}
                      placeholder="Ex: 2024"
                      min="1900"
                      max="2100"
                      className="w-full px-4 py-2 bg-white/7 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-500 transition-colors text-sm"
                    />
                  </div>

                  {/* Preço De */}
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Preço De (R$)</label>
                    <input
                      type="number"
                      value={filters.precoDe}
                      onChange={(e) => handleFilterChange("precoDe", e.target.value)}
                      placeholder="Ex: 50000"
                      min="0"
                      className="w-full px-4 py-2 bg-white/7 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-500 transition-colors text-sm"
                    />
                  </div>

                  {/* Preço Até */}
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Preço Até (R$)</label>
                    <input
                      type="number"
                      value={filters.precoAte}
                      onChange={(e) => handleFilterChange("precoAte", e.target.value)}
                      placeholder="Ex: 200000"
                      min="0"
                      className="w-full px-4 py-2 bg-white/7 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-500 transition-colors text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 mb-12">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Grid de Veículos */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[...Array(6)].map((_, i) => (
                <VehicleCardSkeleton key={i} />
              ))}
            </div>
          ) : filtering ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[...Array(6)].map((_, i) => (
                <VehicleCardSkeleton key={i} />
              ))}
            </div>
          ) : searching ? (
            // Mostrar skeleton sempre que estiver buscando
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {vehicles.length > 0 ? (
                // Se já tem resultados, mostrar skeletons no lugar dos cards
                <>
                  {[...Array(Math.min(vehicles.length, 6))].map((_, i) => (
                    <VehicleCardSkeleton key={`skeleton-${i}`} />
                  ))}
                </>
              ) : (
                // Se não tem resultados ainda, mostrar 6 skeletons
                [...Array(6)].map((_, i) => (
                  <VehicleCardSkeleton key={i} />
                ))
              )}
            </div>
          ) : error ? null : (
            <>
              {vehicles.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-white/60 text-lg">
                    {activeSearchQuery
                      ? "Nenhum veículo encontrado com essa busca."
                      : "Nenhum veículo disponível no momento."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} {...vehicle} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Formulário de Interesse */}
          <div className="mb-12">
            <VehicleInterestForm />
          </div>

          {/* Botão Carregar Mais */}
          <div className="flex justify-center">
            <LearnMoreButton className="learn-more-accent learn-more-wide">
              Carregar mais
            </LearnMoreButton>
          </div>
        </div>
      </section>
    </div>
  )
}

