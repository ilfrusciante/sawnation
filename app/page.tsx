'use client'

import Link from 'next/link'
import CitizenCounter from '@/components/CitizenCounter'
import dynamic from 'next/dynamic'

const WorldMap = dynamic(() => import('@/components/WorldMap'), { ssr: false })

const CONSTITUTION = [
  { num: '01', title: 'NESSUNA GUERRA', text: 'SAWNation non dichiarerà mai guerra a nessuno. Non esiste un motivo sufficiente per mandare i giovani a morire per decisioni che non hanno preso.', color: 'bg-saw-red text-white' },
  { num: '02', title: 'NESSUN CONFINE', text: 'Ogni studente under 30 è benvenuto, indipendentemente da nazionalità, religione o appartenenza politica. La giovinezza non ha frontiere.', color: 'bg-saw-yellow text-black' },
  { num: '03', title: 'NESSUN LEADER PERMANENTE', text: 'Il portavoce dura 7 giorni e non può essere rieletto. Il potere che non ruota è potere che corrompe. Abbiamo scelto di non corrompere.', color: 'bg-black text-white' },
  { num: '04', title: 'I DATI SONO SACRI', text: "I dati dei cittadini non verranno mai venduti, condivisi o ceduti. Mai. Per nessuna somma. È l'articolo che non si può toccare.", color: 'bg-saw-blue text-white' },
]

const SECTIONS = [
  {
    href: '/passaporto',
    title: 'IL PASSAPORTO',
    desc: 'Il tuo documento di cittadinanza digitale. Numero progressivo. Solo 2€.',
    img: 'https://images.unsplash.com/photo-1761069234490-ee6998b25e21?auto=format&fit=crop&w=800&q=80',
    tag: 'IDENTITÀ',
  },
  {
    href: '/tribunale',
    title: 'TRIBUNALE DEI CAPI',
    desc: 'Dati reali e verificati su vendite di armi, decisioni di guerra. Solo fatti.',
    img: 'https://images.unsplash.com/photo-1631791563807-d41830aa0af4?auto=format&fit=crop&w=800&q=80',
    tag: 'ACCOUNTABILITY',
  },
  {
    href: '/art-for-peace',
    title: 'ART FOR PEACE',
    desc: "L'arte è l'unica arma che non uccide. Artisti da tutto il mondo contro la guerra.",
    img: 'https://images.unsplash.com/photo-1572280935179-bad2474e2646?auto=format&fit=crop&w=800&q=80',
    tag: 'CREATIVITÀ',
  },
  {
    href: '/meme',
    title: 'UN MEME VI SOTTERRERÀ',
    desc: 'Sfida meme settimanale. La community vota. Il vincitore va agli uffici stampa.',
    img: 'https://images.unsplash.com/photo-1759876223884-9892ba610fd4?auto=format&fit=crop&w=800&q=80',
    tag: 'SATIRA',
  },
  {
    href: '/antiparlamento',
    title: "L'ANTI-PARLAMENTO",
    desc: 'Un portavoce eletto ogni 7 giorni. Sempre under 30. Mai rieletto. Mai.',
    img: 'https://images.unsplash.com/photo-1761001826423-7231bfe1ee37?auto=format&fit=crop&w=800&q=80',
    tag: 'DEMOCRAZIA',
  },
  {
    href: '/bilancio',
    title: 'IL BILANCIO',
    desc: "Ogni euro tracciato in tempo reale. L'80% va agli studenti in zone di conflitto.",
    img: 'https://images.unsplash.com/photo-1540929819775-fcc7d4649250?auto=format&fit=crop&w=800&q=80',
    tag: 'TRASPARENZA',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO — split layout */}
      <section className="pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[92vh]">

          {/* Left — testo manifesto su giallo */}
          <div className="bg-saw-yellow border-b-4 md:border-b-0 md:border-r-4 border-black px-8 py-16 md:py-24 flex flex-col justify-center">
            <div className="inline-block mb-6">
              <span className="stamp text-black border-black text-sm font-oswald">
                Students Against War Nation
              </span>
            </div>
            <h1 className="stencil-title text-black leading-none mb-4" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}>
              <span className="block">LE GUERRE LE</span>
              <span className="block">DECIDONO I POTENTI.</span>
            </h1>
            <h2 className="stencil-title leading-none mb-8" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}>
              <span className="block text-saw-red" style={{ WebkitTextStroke: '2px #000', paintOrder: 'stroke fill' }}>I GIOVANI</span>
              <span className="block text-saw-red" style={{ WebkitTextStroke: '2px #000', paintOrder: 'stroke fill' }}>LE PAGANO.</span>
            </h2>
            <p className="font-oswald text-black text-lg font-bold mb-2 max-w-lg">
              Noi siamo i giovani. E abbiamo deciso di smettere di pagare.
            </p>
            <p className="manifesto-text text-black/70 text-sm max-w-lg mb-10">
              La prima nazione digitale costruita da studenti universitari di tutto il mondo.
              Nessun esercito. Nessun confine. Nessun bugiardo al potere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/passaporto" className="btn-protest px-8 py-4 text-xl">
                UNISCITI — 2€
              </Link>
              <Link href="/bilancio" className="btn-blue px-8 py-4 text-xl">
                VEDI I NOSTRI CONTI
              </Link>
            </div>
          </div>

          {/* Right — murale colorato */}
          <div className="relative overflow-hidden min-h-[400px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1717701409410-d1f74ce69a47?auto=format&fit=crop&w=1200&q=80"
              alt="Street art mural"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-6 left-6">
              <div className="bg-saw-yellow border-3 border-black inline-block px-4 py-2">
                <span className="stencil-title text-black text-xl">UNITE FOR PEACE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTER */}
      <section className="bg-black py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="pulse-dot" />
            <span className="font-oswald text-sm font-bold text-saw-red uppercase tracking-widest">Aggiornamento in tempo reale</span>
          </div>
          <CitizenCounter large />
        </div>
      </section>

      <div className="protest-line" />

      {/* OUR MOVEMENT — testo + foto protesta */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-oswald text-xs uppercase tracking-widest text-gray-500 mb-4">— Il Movimento</p>
            <h2 className="stencil-title text-black text-5xl md:text-7xl leading-none mb-6">
              OUR<br />MOVEMENT
            </h2>
            <p className="font-oswald text-lg text-gray-700 leading-relaxed mb-4">
              Ogni guerra degli ultimi cent'anni ha avuto una cosa in comune:
              le decisioni sono state prese da persone che non avrebbero mai combattuto.
            </p>
            <p className="font-oswald text-lg text-gray-700 leading-relaxed mb-6">
              SAWNation nasce da una convinzione semplice: <strong>i giovani del mondo hanno più in comune tra loro
              che con i governi che li rappresentano.</strong> Siamo una nazione senza territorio,
              senza esercito, senza confini — ma con una costituzione reale e un bilancio trasparente.
            </p>
            <Link href="/passaporto" className="btn-protest px-8 py-3 text-xl inline-block">
              ENTRA NEL MOVIMENTO →
            </Link>
          </div>

          {/* Stack di 2 immagini */}
          <div className="space-y-4">
            <div className="thick-border overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1646195151271-e4d9f28abcc7?auto=format&fit=crop&w=900&q=80"
                alt="Anti-war protest"
                className="w-full h-56 object-cover"
              />
            </div>
            <div className="thick-border overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1713311355040-72f9130216eb?auto=format&fit=crop&w=900&q=80"
                alt="Student protest march"
                className="w-full h-56 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="protest-line" />

      {/* ART OF RESISTANCE — banner piena larghezza */}
      <section className="relative overflow-hidden h-80 md:h-[500px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1662369800166-a05d950eba15?auto=format&fit=crop&w=1600&q=80"
          alt="Art of resistance mural"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 h-full flex items-center px-8 md:px-16">
          <div className="max-w-2xl">
            <h2 className="stencil-title text-white leading-none mb-4" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
              ART OF<br />
              <span className="text-saw-yellow">RESISTANCE</span>
            </h2>
            <p className="font-oswald text-white/80 text-lg mb-6 max-w-lg">
              L'arte unisce studenti attraverso colori audaci e messaggi che non si possono ignorare.
              Ogni murale è un manifesto. Ogni opera è un atto politico.
            </p>
            <Link href="/art-for-peace" className="btn-yellow px-8 py-3 text-xl inline-block">
              SCOPRI ART FOR PEACE →
            </Link>
          </div>
        </div>
      </section>

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

      <div className="protest-line" />

      {/* LE SEZIONI — card con immagini come sfondo */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="stencil-title text-5xl md:text-6xl text-black mb-2">LA PIATTAFORMA</h2>
            <p className="font-oswald text-gray-500 uppercase tracking-widest">6 SEZIONI. UNA SOLA MISSIONE.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTIONS.map((s) => (
              <Link key={s.href} href={s.href}
                className="relative overflow-hidden thick-border block group min-h-[320px] transition-transform hover:-translate-y-1"
              >
                {/* Immagine di sfondo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay scuro */}
                <div className="absolute inset-0 bg-black/65 group-hover:bg-black/55 transition-all" />
                {/* Contenuto */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[320px]">
                  <div>
                    <div className="bg-saw-yellow border-2 border-black inline-block px-3 py-1 mb-4">
                      <span className="font-oswald font-black text-black text-xs uppercase tracking-widest">{s.tag}</span>
                    </div>
                    <h3 className="stencil-title text-white text-2xl md:text-3xl mb-3 leading-tight">{s.title}</h3>
                    <p className="font-oswald text-white/75 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="font-oswald font-black text-saw-yellow text-sm uppercase tracking-widest mt-6">
                    ENTRA →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="protest-line" />

      {/* MANIFESTO FINALE */}
      <section className="relative overflow-hidden py-32 px-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1488942446680-85dd7de440ef?auto=format&fit=crop&w=1600&q=80"
          alt="Protest march"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="stencil-title text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 7vw, 5rem)' }}>
            "OGNI GUERRA NELLA STORIA<br />
            È STATA DICHIARATA DA<br />
            QUALCUNO CHE NON<br />
            <span className="bg-saw-yellow text-black px-2">COMBATTERÀ MAI."</span>
          </h2>
          <p className="font-oswald text-gray-300 text-lg mb-10 max-w-xl mx-auto">
            Noi non dichiariamo guerre. Dichiariamo l'esistenza di una nazione che crede
            il futuro non debba essere deciso da chi non ha nulla da perdere.
          </p>
          <Link href="/passaporto" className="btn-yellow px-12 py-5 text-2xl inline-block">
            UNISCITI ORA — 2€
          </Link>
          <p className="font-oswald text-gray-500 text-sm mt-6 uppercase tracking-wide">
            L'80% del tuo contributo va direttamente agli studenti in zone di conflitto
          </p>
        </div>
      </section>

    </div>
  )
}
