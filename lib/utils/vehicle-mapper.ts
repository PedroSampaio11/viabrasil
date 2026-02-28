import { VeiculoRetornoModel, FotoRetornoModel } from "@/lib/types/autocerto"

export interface VehicleCardData {
  id: string
  brand: string
  model: string
  year: string
  price: string
  imageUrl: string
  /** Quilometragem no badge (ex.: "0km", "76.000km") – sempre preenchido pelo mapper */
  badge: string
  isNew: boolean
}

export interface VehicleDetailData {
  id: string
  brand: string
  model: string
  year: string
  km: string
  price: string
  version: string
  fuel: string
  plate: string
  transmission: string
  doors: string
  vehicleModel: string
  images: string[]
  description: string
  optionals: string[]
  observations: string
}

/**
 * Formata preço para formato brasileiro
 */
export function formatPrice(preco: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(preco)
}

/**
 * Formata quilometragem para exibição (normalizado: "0 km", "76.000 km")
 */
export function formatKm(km: number, zeroKm: boolean): string {
  if (zeroKm || km === 0) {
    return "0 km"
  }
  const num = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(km)
  return `${num} km`
}

/**
 * Formata ano (fabricação/modelo)
 */
export function formatYear(anoFabricacao: number, anoModelo: number): string {
  if (anoFabricacao === anoModelo) {
    return `${anoModelo}`
  }
  return `${anoFabricacao}/${anoModelo}`
}

/**
 * Obtém a primeira foto do veículo ou imagem padrão
 */
export function getVehicleImage(fotos: FotoRetornoModel[]): string {
  if (fotos && fotos.length > 0) {
    // Ordena por posição e pega a primeira
    const sortedFotos = [...fotos].sort((a, b) => a.Posicao - b.Posicao)
    return sortedFotos[0].URL
  }
  return "/images/via-brasil-carro.png"
}

/**
 * Obtém todas as fotos do veículo ordenadas por posição
 */
export function getVehicleImages(fotos: FotoRetornoModel[]): string[] {
  if (fotos && fotos.length > 0) {
    const sortedFotos = [...fotos].sort((a, b) => a.Posicao - b.Posicao)
    return sortedFotos.map((foto) => foto.URL)
  }
  return ["/images/via-brasil-carro.png"]
}

/**
 * Mapeia VeiculoRetornoModel para VehicleCardData
 */
export function mapVeiculoToCard(veiculo: VeiculoRetornoModel): VehicleCardData {
  const kmNum = typeof veiculo.Km === "number" ? veiculo.Km : Number(veiculo.Km) || 0
  const zeroKm = Boolean(veiculo.ZeroKm)
  const kmDisplay = formatKm(kmNum, zeroKm)
  return {
    id: veiculo.Codigo.toString(),
    brand: veiculo.Marca,
    model: veiculo.Modelo,
    year: formatYear(veiculo.AnoFabricacao, veiculo.AnoModelo),
    price: formatPrice(veiculo.Preco || veiculo.PrecoClassificados || 0),
    imageUrl: getVehicleImage(veiculo.Fotos || []),
    badge: kmDisplay,
    isNew: veiculo.ZeroKm ?? false,
  }
}

/**
 * Mapeia VeiculoRetornoModel para VehicleDetailData
 */
export function mapVeiculoToDetail(veiculo: VeiculoRetornoModel): VehicleDetailData {
  return {
    id: veiculo.Codigo.toString(),
    brand: veiculo.Marca,
    model: veiculo.Modelo,
    year: formatYear(veiculo.AnoFabricacao, veiculo.AnoModelo),
    km: formatKm(veiculo.Km || 0, veiculo.ZeroKm || false),
    price: formatPrice(veiculo.Preco || veiculo.PrecoClassificados || 0),
    version: veiculo.Versao || "",
    fuel: veiculo.Combustivel || "",
    plate: veiculo.Placa || "",
    transmission: veiculo.Cambio || "",
    doors: veiculo.Portas?.toString() || "",
    vehicleModel: veiculo.Modelo || "",
    images: getVehicleImages(veiculo.Fotos || []),
    description: veiculo.Observacao || "Veículo em excelente estado de conservação.",
    optionals: (veiculo.Opcionais || []).map((opcional) => opcional.Descricao),
    observations: veiculo.Observacao || "Veículo revisado e com garantia de procedência.",
  }
}

