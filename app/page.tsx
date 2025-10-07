import { HeroSection } from "@/components/hero-section"
import { AIModelsSection } from "@/components/ai-models-section"
import { PricingSection } from "@/components/pricing-section"
import { BenefitsSection } from "@/components/benefits-section"
import { StatsSection } from "@/components/stats-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AIModelsSection />
      <PricingSection />
      <BenefitsSection />
      <StatsSection />
    </main>
  )
}
