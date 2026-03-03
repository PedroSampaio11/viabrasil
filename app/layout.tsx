import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SplashScreen } from "@/components/splash-screen";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">
        <SplashScreen>
          <Header />
          <div className="h-[72px]" aria-hidden="true" />
          {children}
          <Footer />
        </SplashScreen>
      </body>
    </html>
  );
}
