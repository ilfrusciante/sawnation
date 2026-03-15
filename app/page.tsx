'use client'

import Link from 'next/link'
import CitizenCounter from '@/components/CitizenCounter'
import dynamic from 'next/dynamic'
import { CrowdFists, SingleFist, WorldCrowd } from '@/components/ProtestArt'

const WorldMap = dynamic(() => import('@/components/WorldMap'), { ssr: false })

const CONSTITUTION = [
  { num: '01', title: 'NESSUNA GUERRA', text: 'SAWNation non dichiarerà mai guerra a nessuno. Non esiste un motivo sufficiente per mandare i giovani a morire per decisioni che non hanno preso.', color: 'bg-saw-red text-white' },
  { num: '02', title: 'NESSUN CONFINE', text: 'Ogni studente under 30 è benvenuto, indipendentemente da nazionalità, religione o appartenenza politica. La giovinezza non ha frontiere.', color: 'bg-saw-yellow text-black' },
  { num: '03', title: 'NESSUN LEADER PERMANENTE', text: 'Il portavoce dura 7 giorni e non può essere rieletto. Il potere che non ruota è potere che corrompe. Abbiamo scelto di non corrompere.', color: 'bg-black text-white' },
  { num: '04', title: 'I DATI SONO SACRI', text: 'I dati dei cittadini non verranno mai venduti, condivisi o ceduti. Mai. Per nessuna somma. È l\'articolo che non si può toccare.', color: 'bg-saw-blue text-white' },
]

const SECTIONS = [
  { href: '/passaporto', emoji: '✊', title: 'IL PASSAPORTO', desc: 'Il tuo documento di cittadinanza digitale. Numero progressivo. La tua posizione nella storia di una nazione che non ha mai dichiarato guerra. Solo 2€.', bg: 'bg-saw-red', text: 'text-white' },
  { href: '/tribunale', emoji: '⚖️', title: 'TRIBUNALE DEI CAPI', desc: 'Un archivio di fatti verificati. Dati reali su vendite di armi, decisioni di guerra e cifre che i governi preferiscono non pubblicare.', bg: 'bg-black', text: 'text-white' },
  { href: '/art-for-peace', emoji: '🎨', title: 'ART FOR PEACE', desc: "L'arte è l'unica arma che non uccide. Artisti da tutto il mondo usano creatività e cultura per sfidare la narrativa della guerra.", bg: 'bg-saw-yellow', text: 'text-black' },
  { href: '/meme', emoji: '✌️', title: 'UN MEME VI SOTTERRERÀ', desc: 'Sfida meme settimanale su un tema politico reale. La community vota. Il vincitore viene inviato ufficialmente all\'ufficio stampa del capo di stato coinvolto.', bg: 'bg-saw-blue', text: 'text-white' },
  { href: '/antiparlamento', emoji: '🗳️', title: "L'ANTI-PARLAMENTO", desc: 'Un portavoce eletto ogni 7 giorni, da un paese diverso, sempre under 30, mai rieletto. La democrazia che i parlamenti non hanno il coraggio di fare.', bg: 'bg-saw-paper text-black', text: 'text-black' },
  { href: '/bilancio', emoji: '📊', title: 'IL BILANCIO', desc: 'Ogni euro tracciato in tempo reale. L\'80% va direttamente agli studenti in zone di conflitto. Nessun governo al mondo fa questo.', bg: 'bg-white', text: 'text-black' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO — giallo manifesto, stile riferimento */}
      <section className="pt-16">
        <div className="bg-saw-yellow border-b-4 border-black px-6 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">

            <div className="inline-block mb-6">
              <span className="stamp text-black border-black text-sm font-oswald">
                Students Against War Nation
              </span>
            </div>

            <h1 className="stencil-title text-black leading-none mb-4" style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)' }}>
              <span className="block">LE GUERRE LE</span>
              <span className="block">DECIDONO I POTENTI.</span>
            </h1>
            <h2 className="stencil-title leading-none mb-8" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
              <span className="block text-saw-red" style={{ WebkitTextStroke: '2px #000', paintOrder: 'stroke fill' }}>I GIOVANI</span>
              <span className="block text-saw-red" style={{ WebkitTextStroke: '2px #000', paintOrder: 'stroke fill' }}>LE PAGANO.</span>
            </h2>

            <p className="font-oswald text-black text-xl md:text-2xl font-bold mb-2 max-w-2xl">
              Noi siamo i giovani. E abbiamo deciso di smettere di pagare.
            </p>
            <p className="manifesto-text text-black/70 text-base md:text-lg max-w-2xl mb-10">
              SAWNation è la prima nazione digitale nella storia costruita da studenti universitari di tutto il mondo.
              Nessun esercito. Nessun confine. Nessun bugiardo al potere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/passaporto" className="btn-protest px-10 py-4 text-2xl">
                UNISCITI — 2€
              </Link>
              <Link href="/bilancio" className="btn-blue px-10 py-4 text-2xl">
                VEDI I NOSTRI CONTI
              </Link>
            </div>
          </div>
        </div>
        {/* Illustrazione crowd sotto l'hero */}
        <div className="bg-saw-yellow border-t-4 border-black px-6 py-6 overflow-hidden">
          <CrowdFists className="w-full max-w-3xl mx-auto" />
        </div>
      </section>

      {/* COUNTER */}
      <section className="bg-black py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="pulse-dot" />
            <span className="font-oswald text-sm font-bold text-saw-red uppercase tracking-widest">Aggiornamento in tempo reale</span>
          </div>
          <CitizenCounter large />
          <WorldCrowd className="w-full max-w-2xl mx-auto mt-10 opacity-80" />
        </div>
      </section>

      {/* LINEA */}
      <div className="protest-line" />

      {/* IL NOSTRO MOVIMENTO */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-oswald text-xs uppercase tracking-widest text-gray-500 mb-4">— Il Movimento</p>
            <h2 className="stencil-title text-black text-5xl md:text-6xl leading-none mb-6">
              OUR<br />MOVEMENT
            </h2>
            <p className="font-oswald text-lg text-gray-700 leading-relaxed mb-4">
              Ogni guerra degli ultimi cent'anni ha avuto una cosa in comune:
              le decisioni sono state prese da persone che non avrebbero mai combattuto.
            </p>
            <p className="font-oswald text-lg text-gray-700 leading-relaxed mb-6">
              SAWNation nasce da una convinzione semplice: <strong>i giovani del mondo hanno più in comune tra loro
              che con i governi che li rappresentano.</strong> Siamo una nazione senza territorio,
              senza esercito, senza confini — ma con una costituzione, un bilancio trasparente
              e la volontà collettiva di milioni di studenti.
            </p>
            <Link href="/passaporto" className="btn-protest px-8 py-3 text-xl inline-block">
              ENTRA NEL MOVIMENTO →
            </Link>
          </div>
          <div className="thick-border bg-saw-yellow overflow-hidden">
            <SingleFist className="w-32 mx-auto mt-6" color="#FF0000" />
            <p className="stencil-title text-black text-2xl mb-6 px-8 pt-2">I NUMERI CHE I GOVERNI NON PUBBLICANO</p>
            <div className="space-y-4 px-8 pb-8">
              {[
                { num: '2.100+', label: 'miliardi di dollari spesi in armi nel 2023 (SIPRI)', color: 'text-saw-red' },
                { num: '43%', label: 'dei soldati morti nelle ultime guerre aveva meno di 25 anni', color: 'text-black' },
                { num: '0', label: 'guerre dichiarate da SAWNation da quando esiste', color: 'text-black' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start border-b-2 border-black pb-4">
                  <div className={`stencil-title text-3xl ${item.color} flex-shrink-0`}>{item.num}</div>
                  <div className="font-oswald text-black text-sm leading-tight">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LINEA */}
      <div className="protest-line" />

      {/* MAPPA */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-2 w-16 bg-black" />
            <h2 className="stencil-title text-black text-4xl md:text-5xl">🌍 LA MAPPA DEI CITTADINI</h2>
            <div className="h-2 flex-1 bg-black" />
          </div>
          <p className="font-oswald text-gray-600 mb-8 text-lg">Ogni punto è uno studente. In tempo reale. Da ogni angolo del pianeta.</p>
          <div className="border-4 border-black" style={{ boxShadow: '6px 6px 0 #000' }}>
            <WorldMap />
          </div>
        </div>
      </section>

      {/* LINEA */}
      <div className="protest-line" />

      {/* COSTITUZIONE */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="stencil-title text-6xl md:text-7xl text-black mb-2">LA COSTITUZIONE</h2>
            <p className="font-oswald text-gray-500 text-lg uppercase tracking-widest">4 ARTICOLI. IMMUTABILI. PER SEMPRE.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONSTITUTION.map((a) => (
              <div key={a.num} className={`${a.color} thick-border p-8 relative`}>
                <div className="stencil-title text-7xl opacity-10 absolute top-2 right-4 select-none">{a.num}</div>
                <p className="font-oswald text-xs uppercase tracking-widest opacity-60 mb-2">Articolo {a.num}</p>
                <h3 className="stencil-title text-2xl md:text-3xl mb-4">{a.title}</h3>
                <p className="manifesto-text text-sm leading-relaxed opacity-90">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LINEA */}
      <div className="protest-line" />

      {/* LE SEZIONI */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="stencil-title text-5xl md:text-6xl text-black mb-2">LA PIATTAFORMA</h2>
            <p className="font-oswald text-gray-500 uppercase tracking-widest">6 SEZIONI. UNA SOLA MISSIONE.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTIONS.map((s) => (
              <Link key={s.href} href={s.href}
                className={`${s.bg} ${s.text} thick-border p-8 block group transition-transform hover:-translate-y-1`}
              >
                <div className="text-5xl mb-4">{s.emoji}</div>
                <h3 className="stencil-title text-2xl md:text-3xl mb-3">{s.title}</h3>
                <p className="font-oswald text-sm leading-relaxed opacity-80 mb-6">{s.desc}</p>
                <div className="font-oswald font-bold uppercase tracking-wide text-sm flex items-center gap-2">
                  ENTRA →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LINEA */}
      <div className="protest-line" />

      {/* MANIFESTO FINALE */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="stencil-title text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 7vw, 5rem)' }}>
            "OGNI GUERRA NELLA STORIA<br />
            È STATA DICHIARATA DA<br />
            QUALCUNO CHE NON<br />
            <span className="bg-saw-yellow text-black px-2">COMBATTERÀ MAI."</span>
          </h2>
          <p className="font-oswald text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Noi non dichiariamo guerre. Dichiariamo l'esistenza di una nazione che crede
            il futuro non debba essere deciso da chi non ha nulla da perdere.
          </p>
          <Link href="/passaporto" className="btn-yellow px-12 py-5 text-2xl inline-block">
            UNISCITI ORA — 2€
          </Link>
          <p className="font-oswald text-gray-600 text-sm mt-6 uppercase tracking-wide">
            L'80% del tuo contributo va direttamente agli studenti in zone di conflitto
          </p>
        </div>
      </section>

    </div>
  )
}
