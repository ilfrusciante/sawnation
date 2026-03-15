import Link from 'next/link'
import CitizenCounter from '@/components/CitizenCounter'
import dynamic from 'next/dynamic'

const WorldMap = dynamic(() => import('@/components/WorldMap'), { ssr: false })

const CONSTITUTION = [
  { num: '01', title: 'NESSUNA GUERRA', text: 'SAWNation non dichiarerà mai guerra a nessuno. Mai.', color: 'bg-saw-red text-white' },
  { num: '02', title: 'NESSUN CONFINE', text: 'Tutti gli esseri umani under 30 sono benvenuti. Senza distinzione di nazionalità, religione o colore politico.', color: 'bg-saw-yellow text-black' },
  { num: '03', title: 'NESSUN LEADER PERMANENTE', text: 'Il portavoce dura 7 giorni e non può essere rieletto mai.', color: 'bg-saw-blue text-white' },
  { num: '04', title: 'I DATI SONO SACRI', text: 'I dati dei cittadini non verranno mai venduti, condivisi o ceduti. Mai. Per nessuna somma.', color: 'bg-black text-white border-4 border-white' },
]

const SECTIONS = [
  { href: '/passaporto', emoji: '✊', title: 'IL PASSAPORTO', desc: 'La tua carta d\'identità digitale. Numero progressivo. Solo 2€.', bg: 'bg-saw-red', text: 'text-white' },
  { href: '/tribunale', emoji: '⚖️', title: 'TRIBUNALE DEI CAPI', desc: 'Solo fatti verificati. Nessuna opinione. Solo dati devastanti.', bg: 'bg-saw-yellow', text: 'text-black' },
  { href: '/meme', emoji: '✌️', title: 'UN MEME VI SOTTERRERÀ', desc: 'Sfida meme settimanale. Il vincitore va all\'ufficio stampa del capo.', bg: 'bg-saw-blue', text: 'text-white' },
  { href: '/antiparlamento', emoji: '🗳️', title: "L'ANTI-PARLAMENTO", desc: 'Eletti ogni 7 giorni. Sempre under 30. Mai rieletti.', bg: 'bg-black', text: 'text-white' },
  { href: '/bilancio', emoji: '📊', title: 'IL BILANCIO', desc: 'Ogni euro tracciato in tempo reale. 80% agli studenti in guerra.', bg: 'bg-saw-paper text-black', text: 'text-black' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">

      {/* HERO — stile manifesto gigante */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 overflow-hidden">

        {/* Sfondo texture */}
        <div className="absolute inset-0 bg-black" />
        {/* Bande diagonali sottili */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #FF0000 0px, #FF0000 2px, transparent 2px, transparent 20px)' }}
        />

        <div className="relative z-10 text-center max-w-6xl mx-auto w-full">

          {/* Tag stile graffiti */}
          <div className="inline-block mb-6">
            <span className="stamp text-saw-yellow border-saw-yellow text-sm">
              ✊ Students Against War Nation
            </span>
          </div>

          {/* Titolo enorme stile Shepard Fairey */}
          <h1 className="stencil-title text-white leading-none mb-2" style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}>
            <span className="block">I GOVERNI</span>
            <span className="block text-saw-red" style={{ WebkitTextStroke: '3px #000', paintOrder: 'stroke fill' }}>DIVIDONO</span>
            <span className="block">IL MONDO.</span>
          </h1>
          <h2 className="stencil-title leading-none mb-8" style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)' }}>
            <span className="block bg-saw-yellow text-black inline-block px-4 mb-2">NOI LO</span>
            <span className="block text-saw-blue" style={{ WebkitTextStroke: '2px #000', paintOrder: 'stroke fill' }}>RIUNIAMO.</span>
          </h2>

          <p className="manifesto-text text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-3">
            "I giovani del mondo hanno più in comune tra loro<br/>che con i governi che li rappresentano."
          </p>
          <p className="text-saw-yellow font-bold text-lg mb-10 font-oswald tracking-wide uppercase">
            Loro hanno le armi. Noi abbiamo il futuro.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/passaporto" className="btn-protest px-10 py-4 text-2xl">
              DIVENTA CITTADINO — 2€
            </Link>
            <Link href="/bilancio" className="btn-yellow px-10 py-4 text-2xl">
              GUARDA I NOSTRI CONTI
            </Link>
          </div>

          {/* Counter */}
          <CitizenCounter large />
        </div>
      </section>

      {/* LINEA SEPARATORE */}
      <div className="protest-line my-0" />

      {/* MAPPA */}
      <section className="bg-black px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-2 w-16 bg-saw-red" />
          <h2 className="stencil-title text-white text-4xl md:text-5xl">🌍 LA MAPPA DEI CITTADINI</h2>
          <div className="h-2 flex-1 bg-saw-red" />
        </div>
        <p className="text-gray-400 manifesto-text mb-8">Ogni punto è uno studente. In tempo reale.</p>
        <WorldMap />
      </section>

      {/* LINEA */}
      <div className="protest-line" />

      {/* COSTITUZIONE */}
      <section className="bg-black px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16">
        <div className="mb-12 text-center">
          <h2 className="stencil-title text-5xl md:text-7xl text-white mb-2">LA COSTITUZIONE</h2>
          <p className="manifesto-text text-gray-400 text-lg">4 ARTICOLI. IMMUTABILI. PER SEMPRE.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONSTITUTION.map((a) => (
            <div key={a.num} className={`${a.color} thick-border p-8 relative`}>
              <div className="stencil-title text-6xl opacity-20 absolute top-4 right-6 select-none">{a.num}</div>
              <p className="font-oswald text-xs uppercase tracking-widest opacity-60 mb-2">Articolo {a.num}</p>
              <h3 className="stencil-title text-2xl md:text-3xl mb-4">{a.title}</h3>
              <p className="manifesto-text text-base leading-relaxed opacity-90">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LINEA */}
      <div className="protest-line" />

      {/* LE 5 SEZIONI */}
      <section className="bg-black px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16">
        <div className="mb-12 text-center">
          <h2 className="stencil-title text-5xl md:text-6xl text-white mb-2">LA PIATTAFORMA</h2>
          <p className="manifesto-text text-gray-400">5 SEZIONI. UNA SOLA MISSIONE.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href}
              className={`${s.bg} ${s.text} thick-border p-8 block group transition-transform hover:-translate-y-1 hover:translate-x-0`}
              style={{ boxShadow: '5px 5px 0 #000' }}
            >
              <div className="text-5xl mb-4">{s.emoji}</div>
              <h3 className="stencil-title text-2xl md:text-3xl mb-3">{s.title}</h3>
              <p className="manifesto-text text-sm leading-relaxed opacity-80 mb-6">{s.desc}</p>
              <div className="font-oswald font-bold uppercase tracking-wide text-sm flex items-center gap-2">
                ENTRA →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LINEA */}
      <div className="protest-line" />

      {/* MANIFESTO FINALE */}
      <section className="py-20 px-4" style={{ background: '#FF0000' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="stencil-title text-white leading-tight mb-8"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', WebkitTextStroke: '2px #000', paintOrder: 'stroke fill' }}>
            "I GOVERNI DIVIDONO<br/>
            IL MONDO IN NAZIONI.<br/>
            NOI LO RIUNIAMO<br/>
            <span className="bg-saw-yellow text-black px-2">IN UNA SOLA.</span>"
          </h2>
          <Link href="/passaporto" className="btn-yellow px-12 py-5 text-2xl inline-block">
            UNISCITI ORA — 2€
          </Link>
          <p className="text-white/80 manifesto-text text-sm mt-6">
            80% del tuo contributo va direttamente agli studenti in zone di guerra
          </p>
        </div>
      </section>

    </div>
  )
}
