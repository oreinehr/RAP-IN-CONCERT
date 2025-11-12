"use client"
import { useState } from "react"

const galleryImages = [
  { id: 1, src: "/Rectangle.png", ratio: "square" },
  { id: 2, src: "/Rectangle 2.png", ratio: "wide" },
  { id: 3, src: "/Rectangle 4.png", ratio: "square" },
  { id: 4, src: "/Rectangle 6.png", ratio: "wide" },
  { id: 5, src: "/Rectangle 7.png", ratio: "square" },
  { id: 6, src: "/Rectangle 8.png", ratio: "wide" },
  { id: 7, src: "/Rectangle 9.png", ratio: "square" },
  { id: 8, src: "/Rectangle 10.png", ratio: "wide" },
  { id: 9, src: "/Rectangle 19.png", ratio: "square" },
  { id: 10, src: "/Rectangle 12.png", ratio: "wide" },
  { id: 11, src: "/Rectangle 13.png", ratio: "square" },
  { id: 12, src: "/Rectangle 14.png", ratio: "wide" },
  { id: 13, src: "/Rectangle 16.png", ratio: "square" },
  { id: 14, src: "/Rectangle 27.png", ratio: "wide" },
    { id: 15, src: "/Rectangle 18.png", ratio: "square" },
      { id: 16, src: "/Rectangle 17.png", ratio: "wide" },
   
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section id="gallery" className="relative w-full bg-background py-20 px-4 overflow-hidden">
      <div className="max-w-8xl mx-auto relative">
      

        {/* ✅ Masonry layout sem gaps */}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="break-inside-avoid relative overflow-hidden cursor-pointer group bg-card 
               hover:border-accent transition-all duration-500"
              onClick={() => setSelectedImage(image.id)}
            >
              <img
                src={image.src}
                alt={`Foto ${image.id}`}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* ✨ Efeito de gradiente + blur progressivo */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-64"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.2) 70%, transparent 100%)",
            backdropFilter: "blur(60px)",
            maskImage:
              "linear-gradient(to top, black 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 80%, transparent 100%)",
          }}
        />
      </div>

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
              className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
