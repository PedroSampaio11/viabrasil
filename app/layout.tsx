import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Via Brasil - Tradição em realizar sonhos",
  description: "Mais de 30 anos de história em Ribeirão Preto. Veículos periciados, revisados e com garantia de procedência.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">
        <Header />
        <div className="h-[72px]" aria-hidden="true" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
