import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre | Via Brasil Automóveis",
  description:
    "30 anos de excelência em Ribeirão Pires. Conheça nossa história, missão, visão e valores.",
}

export default function SobreLayout({
  children,
}: { children: React.ReactNode }) {
  return <>{children}</>
}
