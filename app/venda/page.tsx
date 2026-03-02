"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { motion } from "motion/react"
import { Plus } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const inputClass =
  "w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-colors"

export default function VendaPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formState, setFormState] = useState({
    marca: "",
    modelo: "",
    ano: "",
    quilometragem: "",
    valorDesejado: "",
    tipoVenda: "" as "" | "venda" | "consignado",
    nomeCompleto: "",
    email: "",
    telefone: "",
  })
  const [files, setFiles] = useState<File[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: integrar com API
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files
    if (selected) setFiles(Array.from(selected))
  }

  return (
    <main className="min-h-screen bg-[#00020C] text-white">
      {/* Hero – mesmo modelo do contato */}
      <section className="relative h-[300px] sm:h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/VendaVeiculoIMG.png"
            alt="Via Brasil"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-24 sm:pb-32">
          <span className="inline-block text-white/80 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
            VENDA
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Vender meu Carro
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00020C] to-transparent pointer-events-none" />
      </section>

      {/* Form – alinhado ao título, borda em gradiente */}
      <section className="container mx-auto px-4 -mt-12 sm:-mt-16 relative z-10 pb-24">
        <motion.div
          className="max-w-7xl w-full mx-auto rounded-2xl p-[1px]"
          style={{
            background:
              "linear-gradient(135deg, rgb(37 99 235), rgb(34 197 94), rgb(234 179 8), rgb(37 99 235))",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="rounded-2xl bg-[#00020C]/95 backdrop-blur border border-white/5 p-10 sm:p-12 lg:p-16 xl:p-20">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 xl:gap-32">
                {/* Coluna esquerda: Dados do Veículo */}
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-white">Dados do Veículo</h2>
                  <input
                    type="text"
                    placeholder="Digite aqui a marca"
                    value={formState.marca}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, marca: e.target.value }))
                    }
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Digite aqui o modelo"
                    value={formState.modelo}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, modelo: e.target.value }))
                    }
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Digite aqui o ano"
                    value={formState.ano}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, ano: e.target.value }))
                    }
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Digite aqui a quilometragem"
                    value={formState.quilometragem}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, quilometragem: e.target.value }))
                    }
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Valor desejado"
                    value={formState.valorDesejado}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, valorDesejado: e.target.value }))
                    }
                    className={inputClass}
                  />
                  <Select
                    value={formState.tipoVenda || undefined}
                    onValueChange={(value: "venda" | "consignado") =>
                      setFormState((s) => ({ ...s, tipoVenda: value }))
                    }
                  >
                    <SelectTrigger
                      className={inputClass}
                      style={{ height: "auto" }}
                    >
                      <SelectValue placeholder="Venda ou Consignado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="venda">Venda</SelectItem>
                      <SelectItem value="consignado">Consignado</SelectItem>
                    </SelectContent>
                  </Select>
                  <button
                    type="submit"
                    className="w-full px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm uppercase tracking-wide transition-colors"
                  >
                    ENVIAR
                  </button>
                </div>

                {/* Coluna direita: Dados Pessoais + Fotos */}
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-white">Dados Pessoais</h2>
                  <input
                    type="text"
                    placeholder="Nome Completo"
                    value={formState.nomeCompleto}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, nomeCompleto: e.target.value }))
                    }
                    className={inputClass}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    placeholder="Telefone/Whatsapp"
                    value={formState.telefone}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, telefone: e.target.value }))
                    }
                    className={inputClass}
                  />

                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white">
                      Fotos do Veículo (opcional)
                    </h3>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full min-h-[140px] rounded-xl border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors flex flex-col items-center justify-center gap-2 text-white/60 hover:text-white/80"
                    >
                      <Plus className="w-10 h-10" />
                      <span className="text-sm font-medium">
                        {files.length > 0
                          ? `${files.length} foto(s) selecionada(s)`
                          : "Clique para adicionar fotos"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
