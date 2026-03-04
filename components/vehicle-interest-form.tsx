"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface VehicleInterestFormProps {
  codigoVeiculo?: number;
  imageSrc?: string;
  imageAlt?: string;
}

export function VehicleInterestForm({
  codigoVeiculo,
  imageSrc,
  imageAlt = "Via Brasil",
}: VehicleInterestFormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    modelo: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          modeloDesejado: formData.modelo,
          codigoVeiculo: codigoVeiculo,
          interesse: 2, // 2 = Seminovos
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao enviar formulário");
      }

      setSuccess(true);
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        modelo: "",
      });
    } catch (err: any) {
      console.error("Erro ao enviar lead:", err);
      setError(err.message || "Erro ao enviar formulário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const withBackgroundImage = !!imageSrc;

  return (
    <section
      className={
        withBackgroundImage
          ? "relative min-h-[480px] sm:min-h-[520px] w-full overflow-hidden flex flex-col justify-center py-12 sm:py-20"
          : "py-4 sm:py-20 bg-[#00020C]"
      }
    >
      {withBackgroundImage && (
        <>
          <div className="absolute  inset-0">
            <Image
              src={imageSrc}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized
              priority={false}
            />

          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#00020C] to-transparent pointer-events-none" />
        </>
      )}
      <div
        className={
          withBackgroundImage
            ? "relative container mx-auto px-4"
            : "container mx-auto px-4"
        }
      >
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-[670px] font-bold text-white mb-4">
              Não encontrou o modelo que estava buscando?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80">
              Deixe agora o seu contato para ser notificado(a) quando chegar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div>
                <label
                  htmlFor="nome"
                  className="block text-white font-medium mb-2 text-sm sm:text-base md:text-lg"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-white/7 border border-white/20 rounded-[22px] text-white placeholder-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-white font-medium mb-2 text-sm sm:text-base md:text-lg"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-white/7 border border-white/20 rounded-[22px] text-white placeholder-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              {/* Telefone */}
              <div>
                <label
                  htmlFor="telefone"
                  className="block text-white font-medium mb-2 text-sm sm:text-base md:text-lg"
                >
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-white/7 border border-white/20 rounded-[22px] text-white placeholder-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              {/* Modelo Desejado */}
              <div>
                <label
                  htmlFor="modelo"
                  className="block text-white font-medium mb-2 text-sm sm:text-base md:text-lg"
                >
                  Modelo Desejado
                </label>
                <input
                  type="text"
                  id="modelo"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-white/7 border border-white/20 rounded-[22px] text-white placeholder-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Ex: Jetta GLI 2020"
                  required
                />
              </div>
            </div>

            {/* LGPD Text */}
            <div className="pt-4">
              <p className="text-white/60 text-sm leading-relaxed">
                De acordo com a Lei Geral de Proteção de Dados, concordo em
                fornecer os dados acima para que a Via Brasil entre em contato
                comigo para apresentar produtos e serviços. Seu nome, e-mail e
                telefone serão usados com a finalidade de ofertar uma
                oportunidade, de acordo com a nossa{" "}
                <a
                  href="/politica-privacidade"
                  className="text-yellow-500 hover:text-yellow-400 underline"
                >
                  Política de Privacidade
                </a>
                .
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 mb-4">
                <p className="text-green-400 text-center">
                  Formulário enviado com sucesso! Entraremos em contato em
                  breve.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-4">
                <p className="text-red-400 text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 md:px-12 md:py-4 bg-yellow-500 hover:bg-yellow-400/95 disabled:opacity-10 disabled:cursor-not-allowed text-[#00020C] rounded-[22px] font-black text-lg sm:text-xl transition-colors duration-200  flex items-center gap-2 cursor-pointer"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? "ENVIANDO..." : "ENVIAR"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
