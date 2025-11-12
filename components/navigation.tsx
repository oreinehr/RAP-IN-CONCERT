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
        </div>
      </div>
    </nav>
  )
}
