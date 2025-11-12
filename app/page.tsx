import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import IntroSection from "@/components/intro-section"
import YoutubeSection from "@/components/youtube-section"
import Gallery from "@/components/gallery"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <IntroSection />
      <YoutubeSection />
      <Gallery />
    </main>   
  )
}
