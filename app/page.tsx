import Link from 'next/link'
import CitizenCounter from '@/components/CitizenCounter'
import dynamic from 'next/dynamic'

const WorldMap = dynamic(() => import('@/components/WorldMap'), { ssr: false })

const CONSTITUTION = [
  { num: '01', title: 'Nessuna guerra', text: 'SAWNation non dichiarerà mai guerra a nessuno. Mai.' },
  { num: '02', title: 'Nessun confine', text: 'Tutti gli esseri umani under 30 sono benvenuti. Senza distinzione di nazionalità, religione o colore politico.' },
  { num: '03', title: 'Nessun leader permanente', text: 'Il portavoce dura 7 giorni e non può essere rieletto mai.' },
  { num: '04', title: 'I dati sono sacri', text: 'I dati dei cittadini non verranno mai venduti, condivisi o ceduti a nessuna entità. Mai. Per nessuna somma.' },
]

const SECTIONS = [
  {
    href: '/passaporto',
    emoji: '🛂',
    title: 'Il Passaporto',
    desc: 'La tua carta d\'identità digitale. Numero progressivo. Solo 2€.',
    cta: 'Ottieni il tuo',
  },
  {
    href: '/tribunale',
    emoji: '⚖️',
    title: 'Tribunale dei Capi',
    desc: 'Solo fatti verificati. Nessuna opinione. Solo dati devastanti.',
    cta: 'Guarda le schede',
  },
  {
    href: '/meme',
    emoji: '😂',
    title: 'Un Meme Vi Sotterrerà',
    desc: 'Sfida meme settimanale. Il vincitore viene inviato all\'ufficio stampa del capo.',
    cta: 'Partecipa',
  },
  {
    href: '/antiparlamento',
    emoji: '🗳️',
    title: 'L\'Anti-Parlamento',
    desc: 'Eletti ogni 7 giorni. Sempre under 30. Mai rieletti. Solo la verità.',
    cta: 'Vota',
  },
  {
    href: '/bilancio',
    emoji: '📊',
    title: 'Il Bilancio',
    desc: 'Ogni euro tracciato in tempo reale. 80% agli studenti in guerra.',
    cta: 'Guarda i conti',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-8 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#CC0000]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="inline-block bg-[#CC0000]/10 border border-[#CC0000]/30 rounded-full px-6 py-2 text-sm font-bold text-[#CC0000] mb-8 uppercase tracking-widest">
            ✊ Students Against War Nation
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none">
            I governi dividono<br />
            <span className="text-[#CC0000]">il mondo in nazioni.</span><br />
            Noi lo riuniamo<br />
            <span className="text-[#CC0000]">in una sola.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4 font-medium italic">
            "I giovani del mondo hanno più in comune tra loro che con i governi che li rappresentano."
          </p>

          <p className="text-gray-500 mb-12 text-lg">
            Loro hanno le armi. Noi abbiamo il futuro.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/passaporto"
              className="bg-[#CC0000] hover:bg-[#990000] text-white font-black text-xl px-10 py-5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-[#CC0000]/20"
            >
              Diventa Cittadino — 2€
            </Link>
            <Link
              href="/bilancio"
              className="border border-white/20 hover:border-[#CC0000]/50 text-white font-bold text-xl px-10 py-5 rounded-xl transition-all hover:bg-[#CC0000]/5"
            >
              Guarda i nostri conti
            </Link>
          </div>

          {/* Live counter */}
          <CitizenCounter large />
        </div>
      </section>

      {/* WORLD MAP */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">🌍 La Mappa dei Cittadini</h2>
          <p className="text-gray-400">Ogni punto è uno studente. In tempo reale.</p>
        </div>
        <WorldMap />
      </section>

      {/* CONSTITUTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            📜 La Costituzione di SAWNation
          </h2>
          <p className="text-gray-400 text-lg">4 articoli. Immutabili. Per sempre.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONSTITUTION.map((article) => (
            <div key={article.num} className="glass rounded-2xl p-8 hover:border-[#CC0000]/30 transition-all">
              <div className="text-5xl font-black text-[#CC0000]/20 mb-3">{article.num}</div>
              <h3 className="text-xl font-black text-white mb-3">{article.title}</h3>
              <p className="text-gray-400 leading-relaxed">{article.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTIONS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            🏗️ Le 5 Sezioni della Piattaforma
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="glass rounded-2xl p-8 hover:border-[#CC0000]/40 hover:bg-[#CC0000]/5 transition-all group"
            >
              <div className="text-4xl mb-4">{section.emoji}</div>
              <h3 className="text-xl font-black text-white mb-3 group-hover:text-[#CC0000] transition-colors">
                {section.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed text-sm">{section.desc}</p>
              <div className="text-[#CC0000] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                {section.cta} →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-20 text-center">
        <div className="saw-gradient rounded-3xl p-12 md:p-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            "I governi dividono il mondo in nazioni.<br />
            Noi lo riuniamo in una sola.<br />
            Loro hanno le armi.<br />
            Noi abbiamo il futuro."
          </h2>
          <Link
            href="/passaporto"
            className="inline-block bg-white text-[#CC0000] font-black text-xl px-10 py-5 rounded-xl hover:bg-gray-100 transition-all hover:scale-105"
          >
            Unisciti ora — 2€
          </Link>
          <p className="text-white/60 text-sm mt-4">
            80% del tuo contributo va direttamente agli studenti in zone di guerra
          </p>
        </div>
      </section>

    </div>
  )
}
