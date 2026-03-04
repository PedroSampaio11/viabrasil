import { HeroSection } from "@/components/hero-section"
import { EstoqueSection } from "@/components/estoque-section"
import { SellTradeSection } from "@/components/sell-trade-section"
import { QualitySection } from "@/components/quality-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { VehicleInterestForm } from "@/components/vehicle-interest-form"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <>
      <HeroSection />
      <EstoqueSection />
      <SellTradeSection />
      <QualitySection />
      <TestimonialsSection />
      <VehicleInterestForm imageSrc="/home-form.png" imageAlt="Via Brasil Automóveis" />
      <WhatsAppButton />
    </>
  )
}
