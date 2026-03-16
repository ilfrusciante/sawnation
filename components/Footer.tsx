import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black border-t-4 border-saw-red mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="stencil-title text-4xl text-white mb-3">✊ SAWNation</div>
            <p className="manifesto-text text-gray-400 text-sm leading-relaxed mb-4">
              La prima nazione digitale costruita da studenti universitari di tutto il mondo.
              Nessun esercito. Nessun confine. Nessun bugiardo al potere.
            </p>
            <div className="space-y-1">
              <div className="inline-block bg-saw-red text-white font-oswald font-bold text-xs px-3 py-1 mr-1 mb-1">
                NESSUNA GUERRA. MAI.
              </div>
              <div className="inline-block border-2 border-white text-white font-oswald font-bold text-xs px-3 py-1 mr-1 mb-1">
                NESSUN DATO VENDUTO.
              </div>
              <div className="inline-block border-2 border-white text-white font-oswald font-bold text-xs px-3 py-1 mr-1 mb-1">
                OGNI EURO TRACCIATO.
              </div>
            </div>
          </div>

          {/* Costituzione */}
          <div>
            <h3 className="font-oswald font-bold text-white mb-4 text-sm uppercase tracking-widest border-b-2 border-saw-red pb-2">
              La Costituzione
            </h3>
            <ul className="space-y-2 manifesto-text text-sm text-gray-400">
              <li>Art. 1 — Nessuna guerra</li>
              <li>Art. 2 — Nessun confine</li>
              <li>Art. 3 — Nessun leader permanente</li>
              <li>Art. 4 — I dati sono sacri</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-oswald font-bold text-white mb-4 text-sm uppercase tracking-widest border-b-2 border-saw-red pb-2">
              La Piattaforma
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                ['/passaporto', '✊ Il Passaporto'],
                ['/tribunale', '⚖️ Tribunale dei Capi'],
                ['/art-for-peace', '🎨 Art for Peace'],
                ['/meme', '✌️ Un Meme Vi Sotterrerà'],
                ['/antiparlamento', "🗳️ L'Anti-Parlamento"],
                ['/bilancio', '📊 Il Bilancio'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="font-oswald text-gray-400 hover:text-saw-yellow transition-colors uppercase tracking-wide">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t-2 border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="manifesto-text text-gray-600 text-xs">
            © 2025 SAWNation. Registrata in Olanda. Struttura: Benefit Corporation.
          </p>
          <p className="font-oswald text-gray-600 text-xs uppercase tracking-wider">
            sawnation.org — La nazione che non ha mai dichiarato guerra 🕊️
          </p>
        </div>
      </div>
    </footer>
  )
}
