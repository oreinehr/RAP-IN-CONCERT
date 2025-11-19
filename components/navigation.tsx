"use client"

export default function Navigation() {
  const navItems = [
    { label: "RAP IN CONCERT", href: "#" },
    { label: "VÍDEO", href: "#video" },
    { label: "FOTOS", href: "#gallery" },
    { label: "SOBRE", href: "#about" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left navigation items */}
          <div className="flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`text-sm font-semibold transition-colors ${
                  index === 0 ? "text-white text-lg" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Buy Ticket button */}
          <a
            href="https://wa.me/5551980192902?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20ingressos"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold shadow hover:bg-gray-200 transition"
          >
            COMPRAR INGRESSO
          </a>
        </div>
      </div>
    </nav>
  )
}
