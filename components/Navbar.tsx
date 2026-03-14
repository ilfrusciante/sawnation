'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/passaporto', label: '🛂 Passaporto' },
  { href: '/tribunale', label: '⚖️ Tribunale' },
  { href: '/meme', label: '😂 Meme' },
  { href: '/antiparlamento', label: '🗳️ Anti-Parlamento' },
  { href: '/bilancio', label: '📊 Bilancio' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 border-b border-[#CC0000]/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">✊</span>
            <span className="text-xl font-black text-white group-hover:text-[#CC0000] transition-colors">
              SAWNation
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-[#CC0000]/10 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/passaporto"
              className="bg-[#CC0000] hover:bg-[#990000] text-white font-bold px-5 py-2 rounded-lg transition-colors text-sm"
            >
              Diventa Cittadino — 2€
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-[#CC0000]/30 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-sm font-semibold text-gray-300 hover:text-white hover:bg-[#CC0000]/10 rounded-lg transition-all"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/passaporto"
            className="block text-center bg-[#CC0000] hover:bg-[#990000] text-white font-bold px-5 py-3 rounded-lg transition-colors mt-3"
            onClick={() => setOpen(false)}
          >
            Diventa Cittadino — 2€
          </Link>
        </div>
      )}
    </nav>
  )
}
