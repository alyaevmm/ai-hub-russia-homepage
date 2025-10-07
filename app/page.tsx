import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AIModelsSection } from "@/components/ai-models-section"
import { PricingSection } from "@/components/pricing-section"
import { BenefitsSection } from "@/components/benefits-section"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AIModelsSection />
      <PricingSection />
      <BenefitsSection />
      <StatsSection />
      <Footer />
    </main>
  )
}
