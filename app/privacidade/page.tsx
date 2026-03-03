"use client"

import { motion } from "motion/react"

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#00020C] text-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
        <div className="relative container mx-auto px-4">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-4">
            Segurança
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Política de privacidade
          </h1>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="container mx-auto px-4 pb-24">
        <motion.article
          className="max-w-3xl text-left prose prose-invert prose-p:text-white/85 prose-li:text-white/85 prose-headings:text-white"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="space-y-8 text-sm sm:text-base leading-relaxed">
            {/* I. OBJETIVO */}
            <section>
              <h2 className="text-xl font-bold text-white mb-3">I. OBJETIVO</h2>
              <p className="text-white/85">
                A presente Política de Privacidade e Proteção de Dados (&quot;Política&quot;) tem por objetivo orientar quanto às diretrizes aplicáveis à privacidade e proteção dos dados pessoais de clientes, colaboradores, fornecedores e parceiros aos quais a VIA BRASIL AUTOS tem acesso em função de suas atividades. Esta política estabelece regras sobre a coleta, uso, armazenamento, compartilhamento e eliminação de dados, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
              </p>
            </section>

            {/* II. ABRANGÊNCIA */}
            <section>
              <h2 className="text-xl font-bold text-white mb-3">II. ABRANGÊNCIA</h2>
              <p className="text-white/85">
                Aplica-se a todos os colaboradores, prestadores de serviço e terceiros que realizem o tratamento de dados pessoais em nome da VIA BRASIL AUTOS.
              </p>
            </section>

            {/* III. DIRETRIZES */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">III. DIRETRIZES</h2>

              <div className="space-y-6 pl-0">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">1. Compromisso com a Privacidade</h3>
                  <p className="text-white/85 mb-2">A VIA BRASIL AUTOS compromete-se a:</p>
                  <ul className="list-disc pl-6 space-y-1 text-white/85">
                    <li>Zelar pela proteção dos dados coletados no desempenho de suas atividades comerciais;</li>
                    <li>Adotar medidas preventivas de segurança para mitigar riscos de incidentes;</li>
                    <li>Promover a transparência sobre como os dados são tratados junto aos seus titulares.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">2. Dados Pessoais Coletados</h3>
                  <p className="text-white/85 mb-2">Os dados podem ser coletados das seguintes formas:</p>
                  <ul className="list-disc pl-6 space-y-2 text-white/85">
                    <li><strong className="text-white/90">Dados fornecidos pelo titular:</strong> Nome completo, CPF, RG, data de nascimento, estado civil, profissão, endereço, e-mail e telefone (coletados em cadastros de test-drive, propostas de compra ou formulários de contato).</li>
                    <li><strong className="text-white/90">Dados financeiros:</strong> Informações sobre renda, patrimônio e score de crédito (necessários para simulações de financiamento e análise de crédito junto a instituições bancárias).</li>
                    <li><strong className="text-white/90">Dados de navegação:</strong> Cookies, endereço IP, data e hora de acesso, coletados automaticamente durante a navegação no site da VIA BRASIL AUTOS.</li>
                    <li><strong className="text-white/90">Dados de veículos:</strong> Placa, Renavam e fotos do veículo (em casos de avaliação de usados para troca).</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">3. Finalidade da Coleta</h3>
                  <p className="text-white/85 mb-2">A utilização dos dados ocorre para os seguintes propósitos:</p>
                  <ul className="list-disc pl-6 space-y-1 text-white/85">
                    <li><strong className="text-white/90">Execução de contrato:</strong> Venda de veículos, emissão de notas fiscais e formalização de garantias.</li>
                    <li><strong className="text-white/90">Análise de crédito:</strong> Envio de propostas para bancos e financeiras parceiras.</li>
                    <li><strong className="text-white/90">Comunicação e Marketing:</strong> Envio de novidades, promoções e ofertas de veículos de interesse do cliente (mediante consentimento ou interesse legítimo).</li>
                    <li><strong className="text-white/90">Cumprimento legal:</strong> Atendimento a normas fiscais, tributárias e de órgãos de trânsito.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">4. Compartilhamento de Dados com Terceiros</h3>
                  <p className="text-white/85 mb-2">A VIA BRASIL AUTOS poderá compartilhar dados com:</p>
                  <ul className="list-disc pl-6 space-y-1 text-white/85">
                    <li><strong className="text-white/90">Instituições Financeiras:</strong> Para viabilizar o financiamento de veículos.</li>
                    <li><strong className="text-white/90">Despachantes e Órgãos de Trânsito:</strong> Para transferência de propriedade e regularização documental.</li>
                    <li><strong className="text-white/90">Parceiros de Marketing:</strong> Para gestão de campanhas e relacionamento com o cliente.</li>
                    <li><strong className="text-white/90">Autoridades Judiciais/Administrativas:</strong> Sempre que houver obrigação legal ou ordem judicial.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">5. Segurança das Informações</h3>
                  <p className="text-white/85">
                    Adotamos padrões técnicos e administrativos para proteger os dados contra acessos não autorizados ou destruição. O acesso às informações é restrito apenas a colaboradores autorizados que necessitem dos dados para o exercício de suas funções.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">6. Direitos do Titular</h3>
                  <p className="text-white/85 mb-2">Em conformidade com a LGPD, o titular dos dados possui o direito de:</p>
                  <ul className="list-disc pl-6 space-y-1 text-white/85">
                    <li>Confirmar a existência de tratamento de seus dados;</li>
                    <li>Acessar, corrigir ou atualizar seus dados;</li>
                    <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
                    <li>Revogar o consentimento para envios de marketing a qualquer momento.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">7. Período de Armazenamento</h3>
                  <p className="text-white/85">
                    Os dados pessoais serão conservados pelo período necessário para cumprir as finalidades para as quais foram coletados, ou para fins de cumprimento de obrigações legais ou exercício regular de direitos em processos.
                  </p>
                </div>
              </div>
            </section>

            {/* IV. CONTATO */}
            <section>
              <h2 className="text-xl font-bold text-white mb-3">IV. CONTATO</h2>
              <p className="text-white/85">
                Para dúvidas ou solicitações relacionadas a esta Política, o titular poderá entrar em contato através dos canais oficiais disponíveis no site www.viabrasilautos.com.br.
              </p>
            </section>

            <p className="text-white/60 text-sm pt-6 border-t border-white/10">
              Atualizado em: 03 de Fevereiro de 2026. VIA BRASIL AUTOS
            </p>
          </div>
        </motion.article>
      </section>
    </main>
  )
}
