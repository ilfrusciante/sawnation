'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/passaporto', label: 'PASSAPORTO' },
  { href: '/tribunale', label: 'TRIBUNALE' },
  { href: '/art-for-peace', label: 'ART FOR PEACE' },
  { href: '/meme', label: 'MEME' },
  { href: '/antiparlamento', label: 'ANTI-PARLAMENTO' },
  { href: '/bilancio', label: 'BILANCIO' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-black text-lg tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              ✊ SAWNation
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-xs font-semibold text-gray-500 hover:text-black uppercase tracking-widest transition-colors"
                style={{ fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.1em' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link href="/passaporto" className="btn-protest px-5 py-2 text-sm">
              DIVENTA CITTADINO
            </Link>
          </div>

          {/* Mobile */}
          <button className="lg:hidden text-black text-xl" onClick={() => setOpen(!open)}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="block text-xs font-semibold text-gray-500 hover:text-black px-6 py-4 uppercase tracking-widest border-b border-gray-50 transition-colors"
              style={{ fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.1em' }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/passaporto"
            className="block text-center btn-protest px-6 py-4 text-sm m-4"
            onClick={() => setOpen(false)}
          >
            DIVENTA CITTADINO — GRATIS
          </Link>
        </div>
      )}
    </nav>
  )
}
