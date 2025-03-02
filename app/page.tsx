import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { FeatureCards } from "@/components/FeatureCards"
import { Footer } from "@/components/Footer"

export default function HomePage() {
  return (
    // Removed dark:bg so it won’t switch to dark theme
    <div className="min-h-screen flex flex-col bg-[#f2eadd]">
      <div className="absolute inset-0 bg-grid-slate-200/[0.04]" />
      <div className="relative">
        <Header />
        <main className="flex-grow">
          <Hero />
          <FeatureCards />
        </main>
        <Footer />
      </div>
    </div>
  )
}

