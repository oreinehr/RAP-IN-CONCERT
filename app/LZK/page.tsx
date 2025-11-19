"use client"
import Image from "next/image"
import { useState } from "react"

const galleryImages = [
  { id: 1, src: "/lzk/1.png" },
  { id: 2, src: "/lz2.png" },
  { id: 3, src: "/lz3.png" },
  { id: 4, src: "/lz4.png" },
  { id: 5, src: "/lz5.png" },
  { id: 6, src: "/lz6.png" },
]

export default function LzkPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <main className="w-full min-h-screen bg-black text-white">

      {/* ---------------------- HERO ---------------------- */}
      <section className="relative w-full h-[80vh] flex items-end pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/lzk/2.jpeg)" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-6xl sm:text-8xl font-black tracking-tight drop-shadow-2xl">
            LZK
          </h1>
          <p className="mt-2 text-lg text-gray-300 opacity-90">
            Músico, poeta e articulador cultural do Vale dos Sinos
          </p>
        </div>
      </section>

      {/* ---------------------- DESCRIÇÃO ---------------------- */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-lg text-gray-300 space-y-6 leading-relaxed">
        <p>
          Lzk é músico e articulador cultural do Vale dos Sinos. A música entrou na minha vida desde novão, 
          mas foi nas batalhas de rimas que descobri que o microfone podia ser, além de expressão, 
          ferramenta de identidade e liberdade.
        </p>

        <p>
          Desde então, uso o rap como ponte entre minhas vivências, transformando experiência em verso, 
          sentimento em performance e realidade em arte.
        </p>

        <p className="text-2xl font-light italic text-gray-400">
          “Como sempre gosto de pedir, por favor, que mais uma vez
Me escutem...”
        </p>
      </section>

      {/* ---------------------- GRID DE FOTOS ---------------------- */}
      <section className="px-6 pb-28">
        <div className="max-w-6xl mx-auto">
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

      {/* ---------------------- MAIS TEXTO ---------------------- */}
      <section className="max-w-4xl mx-auto pt-10 pb-24 px-6 text-lg text-gray-300 space-y-6 leading-relaxed">
        <p>
          Minha caminhada é feita de encontros, ruas, palcos e olhares. 
          A música nunca foi só carreira – sempre foi ferramenta de transformação.
        </p>

        <p>
          Hoje continuo criando para manter viva essa conexão 
          entre a minha história, o meu povo e tudo aquilo que o rap ainda pode construir.
        </p>
      </section>

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

    </main>
  )
}
