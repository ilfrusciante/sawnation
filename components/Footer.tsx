import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#CC0000]/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✊</span>
              <span className="text-xl font-black text-white">SAWNation</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              La prima nazione digitale fondata dagli studenti universitari di tutto il mondo.
            </p>
            <div className="mt-4 space-y-1">
              <p className="text-[#CC0000] font-bold text-sm">Nessuna guerra dichiarata da sempre.</p>
              <p className="text-[#CC0000] font-bold text-sm">Nessun dato venduto. Mai.</p>
              <p className="text-[#CC0000] font-bold text-sm">Ogni euro tracciato. Sempre. 🕊️</p>
            </div>
          </div>

          {/* La Costituzione */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">La Costituzione</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Art. 1 — Nessuna guerra</li>
              <li>Art. 2 — Nessun confine</li>
              <li>Art. 3 — Nessun leader permanente</li>
              <li>Art. 4 — I dati sono sacri</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">La Piattaforma</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/passaporto" className="text-gray-400 hover:text-[#CC0000] transition-colors">🛂 Il Passaporto</Link></li>
              <li><Link href="/tribunale" className="text-gray-400 hover:text-[#CC0000] transition-colors">⚖️ Tribunale dei Capi</Link></li>
              <li><Link href="/meme" className="text-gray-400 hover:text-[#CC0000] transition-colors">😂 Un Meme Vi Sotterrerà</Link></li>
              <li><Link href="/antiparlamento" className="text-gray-400 hover:text-[#CC0000] transition-colors">🗳️ L'Anti-Parlamento</Link></li>
              <li><Link href="/bilancio" className="text-gray-400 hover:text-[#CC0000] transition-colors">📊 Il Bilancio della Nazione</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © 2025 SAWNation. Registrata in Olanda. Struttura: Benefit Corporation.
          </p>
          <p className="text-gray-500 text-xs">
            sawnation.org — La nazione che non ha mai dichiarato guerra.
          </p>
        </div>
      </div>
    </footer>
  )
}
