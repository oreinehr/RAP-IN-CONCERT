"use client"
import Image from "next/image"
import { useState } from "react"
import Footer from "@/components/footer"

const galleryImages = [

  { id: 2, src: "/abu/abu2.png" },
  { id: 3, src: "/abu/abu3.png" },
  { id: 4, src: "/abu/Rectangle7.png" },
    { id: 1, src: "/abu/abu.png" },

]

export default function LzkPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <main className="w-full min-h-screen bg-black text-white">

      {/* ---------------------- HERO ---------------------- */}
      <section className="relative w-full h-[80vh] flex items-end pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/abu/abu.png)" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-6xl sm:text-8xl font-black tracking-tight drop-shadow-2xl">
            dj abU
          </h1>
          <p className="mt-2 text-lg text-gray-300 opacity-90">
            DJ Produtor Cultural e Educador Social.
          </p>
        </div>
      </section>

      {/* ---------------------- DESCRIÇÃO ---------------------- */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-lg text-gray-300 space-y-6 leading-relaxed">
        <p>
          Representando ja a mais de 30 anos com o movimento Hip Hop e 20 no elemento DJ, um dos pilares do hip hop, essencial para a pratica da arte e suas vertentes , trabalha como DJ nas casas noturnas de Porto Alegre e Regiao  nas festas e eventos particulares propagando a Cultura Hip Hop/Rap e outros estilos musicais , tem um currículo de grandes shows com diversos nomes de peso da cultura Hip Hop/Rap Brasileira e mundial, fez variadas oficinas com o tema do elemento em instituições do Movimento , leva o Hip Hop como estilo de Vida e continua repassando a mensagem de luta para Todes.

        </p>

        <p>
      Abu/Ewls é DJ, produtor cultural e educador social. Tem uma pesquisa diferenciada que transita em diferentes estilos musicais, estão entre os principais o RAP nacional, a black music e a música brasileira. Discoteca em open format sempre girando nos toca-discos. DJ Abu/Ewls vem se destacando na cena e lançou recentemente um disco autoral de vinil  de 7", onde apresenta feats com 4 diferentes artistas com quem trabalha já há algum tempo no cenário do RAP.
        </p>

        <p className="text-2xl font-light italic text-gray-400">
          “Rap in concert em minha opinião veio em um momento de união de musicos e seus intrumentos para fazer algo novo e com essencia musical para evolucão de cada pessoa que leva e sente a vibração da musica e o impacto que ela causa no desenvolvimento comportamental do ser humano.”
        </p>
      </section>

      {/* ---------------------- GRID DE FOTOS ---------------------- */}
     <section className="px-6 pb-28 relative">
  <div className="max-w-6xl mx-auto relative">
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {galleryImages.map((image) => (
        <div
          key={image.id}
          className="break-inside-avoid relative group overflow-hidden cursor-pointer"
          onClick={() => setSelectedImage(image.id)}
        >
          <img
            src={image.src}
            alt=""
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
        </div>
      ))}
    </div>

    {/* GRADIENTE + BLUR */}
    <div
      className="pointer-events-none absolute bottom-0 left-0 w-full h-64"
      style={{
        background:
          "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.2) 100%, transparent 100%)",
        backdropFilter: "blur(px)",
        maskImage:
          "linear-gradient(to top, black 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 80%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to top, black 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 80%, transparent 100%)",
      }}
    />
  </div>
</section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-4xl transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages.find((img) => img.id === selectedImage)?.src}
              alt="Imagem ampliada"
              className="w-full h-auto shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ---------------------- SPOTIFY EMBED ---------------------- */}
      <section className="max-w-4xl mx-auto pb-32 px-6">
   
<iframe
  src="https://open.spotify.com/embed/track/2Bvy9K6KGpHWcoXPCSNQib?utm_source=generator&theme=0"
  width="100%"
  height="352"
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
  className="rounded-xl"
></iframe>
      </section>
<Footer/>
    </main>
  )
}
