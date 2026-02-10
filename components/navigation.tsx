"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Navigation() {
  const navItems = [
    { label: "Sobre", href: "#about" },
    { label: "Video", href: "#video" },
    { label: "Fotos", href: "#gallery" },
  ]

  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="max-w-8xl mx-auto px-0 md:px-4">
        <div className="flex items-center justify-between h-16 px-4 md:px-0">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#">
              <Image
                src="/RIC.svg"
                alt="Rap in Concert"
                width={150}
                height={40}
                className="object-contain"
              />
            </a>
          </div>

          {/* Links desktop */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm sm:text-base font-semibold text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Botão desktop */}
          <div className="hidden md:flex flex-shrink-0">
            <a
              href="#contact"
              className="px-6 py-3 bg-white text-black rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-200 transition-colors"
            >
              Entre em Contato
            </a>
          </div>

          {/* Botão hambúrguer mobile */}
          <div className="md:hidden flex items-center">
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
        <div className="md:hidden backdrop-blur-sm">
          <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col items-center">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-white text-lg font-semibold hover:text-gray-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
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
