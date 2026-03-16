'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/passaporto', label: 'PASSAPORTO', color: 'hover:bg-saw-red hover:text-white' },
  { href: '/tribunale', label: 'TRIBUNALE', color: 'hover:bg-black hover:text-white' },
  { href: '/art-for-peace', label: 'ART FOR PEACE', color: 'hover:bg-saw-yellow hover:text-black' },
  { href: '/meme', label: 'MEME', color: 'hover:bg-saw-blue hover:text-white' },
  { href: '/antiparlamento', label: 'ANTI-PARLAMENTO', color: 'hover:bg-black hover:text-white' },
  { href: '/bilancio', label: 'BILANCIO', color: 'hover:bg-saw-yellow hover:text-black' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="stencil-title text-black text-2xl tracking-wider group-hover:text-saw-red transition-colors">
              ✊ SAWNation
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`font-oswald font-bold text-sm text-black px-4 py-2 uppercase tracking-wider border-l border-gray-200 transition-all ${link.color}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link href="/passaporto" className="btn-protest px-5 py-2 text-base">
              DIVENTA CITTADINO — GRATIS
            </Link>
          </div>

          {/* Mobile */}
          <button className="lg:hidden text-black border-2 border-black p-1 font-bold" onClick={() => setOpen(!open)}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t-4 border-black">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className={`block font-oswald font-bold text-base text-black px-6 py-4 uppercase tracking-wider border-b border-gray-200 transition-all ${link.color}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/passaporto"
            className="block text-center btn-protest px-6 py-4 text-lg m-4"
            onClick={() => setOpen(false)}
          >
            DIVENTA CITTADINO — GRATIS
          </Link>
        </div>
      )}
    </nav>
  )
}
