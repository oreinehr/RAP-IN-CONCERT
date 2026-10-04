"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import CartButton from "@/components/loja/cart-button"

export default function Navigation() {
  const navItems = [
    { label: "Sobre", href: "/#about" },
    { label: "Video", href: "/#video" },
    { label: "Artistas", href: "/#artistas" },
    { label: "Fotos", href: "/#gallery" },
    { label: "Loja", href: "/loja" },
  ]

  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="site-container">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#">
              <Image
                src="/logo-ric.png"
                alt="Rap in Concert"
                width={303}
                height={194}
                priority
                className="object-contain h-12 w-auto invert"
              />
            </a>
          </div>

          {/* Links desktop */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm sm:text-base font-light text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Botão desktop */}
          <div className="hidden md:flex flex-shrink-0 items-center gap-2">
            <CartButton />
            <a
              href="https://wa.me/5551994513729"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg border border-white/25 text-white font-light text-sm sm:text-base hover:border-white/60 hover:bg-white/5 transition-colors"
            >
              Entre em Contato
            </a>
          </div>

          {/* Botão hambúrguer mobile */}
          <div className="md:hidden flex items-center gap-1">
            <CartButton />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-black">
          <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col items-center">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-white text-lg font-light hover:text-gray-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://wa.me/5551994513729"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-5 py-2.5 rounded-lg border border-white/25 text-white font-light hover:border-white/60 hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Entre em Contato
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
