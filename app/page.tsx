'use client'

import Link from 'next/link'
import CitizenCounter from '@/components/CitizenCounter'
import dynamic from 'next/dynamic'

const WorldMap = dynamic(() => import('@/components/WorldMap'), { ssr: false })

const CONSTITUTION = [
  { num: '01', title: 'Nessuna guerra', text: 'SAWNation non dichiarerà mai guerra a nessuno. Non esiste un motivo sufficiente per mandare i giovani a morire per decisioni che non hanno preso.' },
  { num: '02', title: 'Nessun confine', text: 'Ogni studente under 30 è benvenuto, indipendentemente da nazionalità, religione o appartenenza politica. La giovinezza non ha frontiere.' },
  { num: '03', title: 'Nessun leader permanente', text: 'Il portavoce dura 7 giorni e non può essere rieletto. Il potere che non ruota è potere che corrompe.' },
  { num: '04', title: 'I dati sono sacri', text: "I dati dei cittadini non verranno mai venduti, condivisi o ceduti. Mai. Per nessuna somma. È l'articolo che non si può toccare." },
]

const SECTIONS = [
  {
    href: '/passaporto',
    title: 'Il Passaporto',
    desc: 'Il tuo documento di cittadinanza digitale. Numero progressivo. Gratuito.',
    img: 'https://images.unsplash.com/photo-1761069234490-ee6998b25e21?auto=format&fit=crop&w=800&q=80',
    tag: 'Identità',
  },
  {
    href: '/tribunale',
    title: 'Tribunale dei Capi',
    desc: 'Dati reali e verificati su vendite di armi, decisioni di guerra. Solo fatti.',
    img: 'https://images.unsplash.com/photo-1631791563807-d41830aa0af4?auto=format&fit=crop&w=800&q=80',
    tag: 'Accountability',
  },
  {
    href: '/art-for-peace',
    title: 'Art for Peace',
    desc: "L'arte è l'unica arma che non uccide. Artisti da tutto il mondo contro la guerra.",
    img: 'https://images.unsplash.com/photo-1572280935179-bad2474e2646?auto=format&fit=crop&w=800&q=80',
    tag: 'Creatività',
  },
  {
    href: '/meme',
    title: 'Un Meme Vi Sotterrerà',
    desc: 'Sfida meme settimanale. La community vota. Il vincitore va agli uffici stampa.',
    img: 'https://images.unsplash.com/photo-1759876223884-9892ba610fd4?auto=format&fit=crop&w=800&q=80',
    tag: 'Satira',
  },
  {
    href: '/antiparlamento',
    title: "L'Anti-Parlamento",
    desc: 'Un portavoce eletto ogni 7 giorni. Sempre under 30. Mai rieletto. Mai.',
    img: 'https://images.unsplash.com/photo-1761001826423-7231bfe1ee37?auto=format&fit=crop&w=800&q=80',
    tag: 'Democrazia',
  },
  {
    href: '/bilancio',
    title: 'Il Bilancio',
    desc: 'Ogni contributo volontario tracciato in tempo reale. Bilancio pubblico, verificabile da chiunque.',
    img: 'https://images.unsplash.com/photo-1540929819775-fcc7d4649250?auto=format&fit=crop&w=800&q=80',
    tag: 'Trasparenza',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO — full bleed, editorial */}
      <section className="pt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[90vh]">

          {/* Left — editorial text */}
          <div className="bg-white px-10 py-20 md:py-28 flex flex-col justify-center border-r border-gray-100">
            <div className="mb-8">
              <span className="stamp text-gray-400 border-gray-300 text-xs tracking-widest">
                Students Against War Nation — Est. 2025
              </span>
            </div>

            <h1 className="stencil-title text-black leading-tight mb-6" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}>
              Le guerre le decidono i potenti.<br />
              <span className="italic text-gray-500">I giovani le pagano.</span>
            </h1>

            <p className="font-oswald text-gray-600 text-lg leading-relaxed mb-4 max-w-md">
              Noi siamo i giovani. E abbiamo deciso di smettere di pagare.
            </p>
            <p className="font-oswald text-gray-400 text-sm max-w-md mb-10 leading-relaxed">
              La prima nazione digitale costruita da studenti universitari di tutto il mondo.
              Nessun esercito. Nessun confine. Nessun bugiardo al potere. Gratis.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/passaporto" className="btn-protest px-8 py-4 text-base">
                UNISCITI — È GRATIS
              </Link>
              <Link href="/bilancio" className="btn-outline px-8 py-4 text-base">
                SUPPORTA IL PROGETTO
              </Link>
            </div>
          </div>

          {/* Right — full color street art */}
          <div className="relative overflow-hidden min-h-[420px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1717701409410-d1f74ce69a47?auto=format&fit=crop&w=1200&q=80"
              alt="Street art mural"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-6 left-6">
              <div className="bg-white/90 backdrop-blur-sm inline-block px-4 py-2">
                <span className="font-semibold text-black text-sm tracking-wide" style={{ fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.1em' }}>
                  UNITE FOR PEACE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="protest-line" />

      {/* COUNTER */}
      <section className="bg-black py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="pulse-dot" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              Cittadini registrati — in tempo reale
            </span>
          </div>
          <CitizenCounter large />
        </div>
      </section>

      <div className="protest-line" />

      {/* OUR MOVEMENT */}
      <section className="bg-white px-8 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              — Il Movimento
            </p>
            <h2 className="stencil-title text-black text-5xl md:text-6xl leading-tight mb-8">
              Our<br /><span className="italic">Movement</span>
            </h2>
            <p className="font-oswald text-gray-600 text-lg leading-relaxed mb-5">
              Ogni guerra degli ultimi cent'anni ha avuto una cosa in comune:
              le decisioni sono state prese da persone che non avrebbero mai combattuto.
            </p>
            <p className="font-oswald text-gray-600 text-lg leading-relaxed mb-8">
              SAWNation nasce da una convinzione semplice: <strong className="text-black">i giovani del mondo hanno più in comune tra loro
              che con i governi che li rappresentano.</strong>
            </p>
            <Link href="/passaporto" className="btn-protest px-8 py-3 text-sm inline-block">
              ENTRA NEL MOVIMENTO →
            </Link>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1646195151271-e4d9f28abcc7?auto=format&fit=crop&w=900&q=80"
                alt="Anti-war protest"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1713311355040-72f9130216eb?auto=format&fit=crop&w=900&q=80"
                alt="Student protest"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="protest-line" />

      {/* NUMERI */}
      <section className="bg-black py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-12" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            — I numeri che i governi non pubblicano
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              { num: '$2.100+', unit: 'miliardi', label: 'spesi in armi nel 2023', source: 'SIPRI Report 2024' },
              { num: '43%', unit: 'dei soldati', label: 'morti aveva meno di 25 anni', source: 'UN War Statistics' },
              { num: '0', unit: 'figli di capi di stato', label: 'morti al fronte nelle guerre da loro dichiarate', source: 'Ogni guerra degli ultimi 100 anni' },
              { num: '0', unit: 'guerre', label: 'dichiarate da SAWNation', source: 'Costituzione SAWNation, Art. 1' },
            ].map((item, i) => (
              <div key={i} className="border-t border-gray-800 px-0 py-8 pr-8">
                <div className="stencil-title text-white leading-none mb-2" style={{ fontSize: '3.5rem' }}>
                  {item.num}
                </div>
                <div className="font-oswald text-gray-400 text-sm uppercase tracking-wide">{item.unit}</div>
                <div className="font-oswald text-gray-500 text-sm mt-2 leading-relaxed">{item.label}</div>
                <div className="font-oswald text-gray-700 text-xs mt-3 italic">{item.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="protest-line" />

      {/* ART OF RESISTANCE */}
      <section className="relative overflow-hidden h-80 md:h-[480px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1662369800166-a05d950eba15?auto=format&fit=crop&w=1600&q=80"
          alt="Art of resistance mural"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center px-10 md:px-16">
          <div className="max-w-xl">
            <p className="text-xs text-white/60 uppercase tracking-widest mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>— Art for Peace</p>
            <h2 className="stencil-title text-white leading-tight mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Art of<br /><span className="italic">Resistance</span>
            </h2>
            <p className="font-oswald text-white/70 text-base mb-6 max-w-sm leading-relaxed">
              L'arte unisce studenti attraverso immagini che non si possono ignorare.
            </p>
            <Link href="/art-for-peace" className="btn-black px-7 py-3 text-sm inline-block">
              SCOPRI ART FOR PEACE →
            </Link>
          </div>
        </div>
      </section>

      <div className="protest-line" />

      {/* MAPPA — centerpiece */}
      <section className="bg-white px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                — La Mappa dei Cittadini
              </p>
              <h2 className="stencil-title text-black text-4xl md:text-6xl leading-tight mb-4">
                Guardate<br /><span className="italic">quanti siamo.</span>
              </h2>
              <p className="font-oswald text-gray-600 text-lg leading-relaxed">
                Ognuno di questi punti è una persona che ha detto basta.
                Veniamo da paesi che si combattono, parliamo lingue diverse,
                abbiamo storie diverse — ma siamo d'accordo su una cosa:
                il futuro non si decide in guerra.
              </p>
              <p className="font-oswald text-black font-semibold text-base mt-4 leading-relaxed">
                Noi lo stiamo già costruendo insieme.
              </p>
              <div className="flex items-center gap-2 mt-6">
                <div className="pulse-dot" />
                <span className="text-xs text-gray-400 uppercase tracking-widest" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                  Il punto rosso indica una nuova iscrizione in tempo reale
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1573166953836-06864dc70c45?auto=format&fit=crop&w=800&q=80"
                alt="Students gathered"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          <div className="border border-gray-200" style={{ height: '520px' }}>
            <WorldMap />
          </div>
        </div>
      </section>

      <div className="protest-line" />

      {/* COSTITUZIONE */}
      <section className="bg-white px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>— 4 Articoli. Immutabili. Per sempre.</p>
            <h2 className="stencil-title text-black text-5xl md:text-6xl">La Costituzione</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100">
            {CONSTITUTION.map((a) => (
              <div key={a.num} className="bg-white p-10 relative">
                <p className="text-xs text-gray-300 uppercase tracking-widest mb-3" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                  Articolo {a.num}
                </p>
                <h3 className="stencil-title text-black text-2xl md:text-3xl mb-4">{a.title}</h3>
                <p className="font-oswald text-gray-500 text-base leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="protest-line" />

      {/* SEZIONI */}
      <section className="bg-white px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>— 6 sezioni. Una sola missione.</p>
            <h2 className="stencil-title text-black text-5xl md:text-6xl">La Piattaforma</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTIONS.map((s) => (
              <Link key={s.href} href={s.href}
                className="relative overflow-hidden block group min-h-[300px] border border-gray-200 hover:border-black transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-all" />
                <div className="relative z-10 p-7 h-full flex flex-col justify-between min-h-[300px]">
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-widest mb-3" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                      {s.tag}
                    </p>
                    <h3 className="stencil-title text-white text-2xl md:text-3xl mb-3 leading-tight">{s.title}</h3>
                    <p className="font-oswald text-white/60 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="text-xs font-semibold text-white/80 uppercase tracking-widest mt-6 pt-4 border-t border-white/20" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                    Entra →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="protest-line" />

      {/* MANIFESTO FINALE */}
      <section className="relative overflow-hidden py-36 px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1488942446680-85dd7de440ef?auto=format&fit=crop&w=1600&q=80"
          alt="Protest march"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="stencil-title text-white leading-tight mb-8"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)' }}>
            "Ogni guerra nella storia è stata dichiarata da qualcuno che non combatterà mai."
          </h2>
          <p className="font-oswald text-gray-400 text-base mb-10 max-w-lg mx-auto leading-relaxed">
            Noi non dichiariamo guerre. Dichiariamo l'esistenza di una nazione
            che crede il futuro non debba essere deciso da chi non ha nulla da perdere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/passaporto" className="btn-protest px-12 py-4 text-sm inline-block">
              UNISCITI — È GRATIS
            </Link>
            <Link href="/bilancio" className="btn-outline px-12 py-4 text-sm inline-block" style={{ color: '#FFF', borderColor: 'rgba(255,255,255,0.4)' }}>
              SUPPORTA IL PROGETTO
            </Link>
          </div>
          <p className="font-oswald text-gray-600 text-xs mt-8 uppercase tracking-widest">
            Passaporto gratuito · Contributi volontari · Bilancio pubblico in tempo reale
          </p>
        </div>
      </section>

    </div>
  )
}
