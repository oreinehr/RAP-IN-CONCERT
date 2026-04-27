import Image from "next/image"

type Artist = {
  name: string
  role: string
  image: string
  instagram: string
}

const artists: Artist[] = [
  // Adicione artistas aqui:
  {
    name: "WEslEy sales",
    role: "Rapper e Criador do Rap in Concert",
    image: "/Rectangle 16.png",
    instagram: "https://www.instagram.com/wesleyosales/",
  },
  {
    name: "ReinehR",
    role: "Mestre de Cerimônias",
    image: "/Rectangle 4.png",
    instagram: "https://www.instagram.com/reinehrrl/",
  },
  {
    name: "lzk",
    role: "Mestre de Cerimônias",
    image: "/Rectangle 6.png",
    instagram: "https://www.instagram.com/lzkemiciog/",
  },
  {
    name: "Dj Abu",
    role: "DJ",
    image: "/Rectangle 7.png",
    instagram: "https://www.instagram.com/djabu/",
  },
  {
    name: "Daniel Ab'yala",
    role: "Mestre de Cerimônias",
    image: "/Rectangle 14.png",
    instagram: "https://www.instagram.com/daniel.abyala/",
  },

     {
    name: "Vô João",
    role: "Mestre.",
    image: "/Rectangle.png",
    instagram: "https://www.instagram.com/its__manuuz/",
  },

   {
    name: "Emanuelle",
    role: "Mestra de Cerimônias",
    image: "/Manu.png",
    instagram: "https://www.instagram.com/its__manuuz/",
  },

  {
    name: "Wesley Albernaz",
    role: "Cantor",
    image: "/Albernaz.png",
    instagram: "https://www.instagram.com/its__manuuz/",
  },


]

export default function ArtistsSection() {
  if (artists.length === 0) return null

  return (
    <section id="artistas" className="py-16 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl md:text-7xl text-white mb-12"
          style={{ fontFamily: '"thunderhouse-pro", sans-serif' }}
        >
          ARtistas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artists.map((artist) => (
            <a
              key={artist.name + artist.image}
              href={artist.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-gray-900 aspect-square cursor-pointer"
            >
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p
                  className="text-white text-2xl md:text-3xl leading-tight"
                  style={{ fontFamily: '"thunderhouse-pro", sans-serif' }}
                >
                  {artist.name}
                </p>
                <p className="text-gray-300 text-sm md:text-base mt-1">{artist.role}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
