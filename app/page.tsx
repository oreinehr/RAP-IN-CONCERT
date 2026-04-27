import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import IntroSection from "@/components/intro-section"
import YoutubeSection from "@/components/youtube-section"
import ArtistsSection from "@/components/artists-section"
import Gallery from "@/components/gallery"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <IntroSection />
      <YoutubeSection />
      <ArtistsSection />
      <Gallery />
      <Footer />
    </main>
  )
}
