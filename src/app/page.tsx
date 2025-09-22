import { Header } from "@/components/header"
import { HeroSection3D } from "@/components/hero-section-3d"
import { Footer } from "@/components/footer"
import { FallingLeaves } from "@/components/falling-leaves"
import { EnhancedCardsSection } from "@/components/enhanced-cards-section"
import { InteractiveTimeline } from "@/components/interactive-timeline"
import { ParallaxQuotes } from "@/components/parallax-quotes"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden" suppressHydrationWarning={true}>
      <FallingLeaves />
      <Header />
      <main>
        <HeroSection3D />
        <EnhancedCardsSection />
        <ParallaxQuotes />
        <InteractiveTimeline />
      </main>
      <Footer />
    </div>
  )
}
