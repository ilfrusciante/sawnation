'use client'

import Link from 'next/link'

const MANIFESTO = [
  {
    title: 'L\'ARTE NON UCCIDE',
    text: 'Ogni opera d\'arte contro la guerra è un atto di resistenza. Non con le armi, ma con colori, parole e immagini che restano nella memoria più a lungo di qualsiasi proiettile.',
  },
  {
    title: 'LA CREATIVITÀ È POLITICA',
    text: 'Ignorare la guerra non la ferma. Nominarla, raffigurarla, renderla visibile — questo costringe il mondo a guardarla. Gli artisti di SAWNation non si girano dall\'altra parte.',
  },
  {
    title: 'UN LINGUAGGIO UNIVERSALE',
    text: 'L\'arte supera le frontiere che i governi costruiscono. Una studentessa di Kyiv e uno studente di Gaza possono parlare la stessa lingua visiva. Questo è già pace.',
  },
]

const CATEGORIES = [
  { icon: '✏️', title: 'Illustrazione & Grafica', desc: 'Poster, manifesti, disegni digitali. La tradizione del manifesto politico riportata nel 21° secolo.' },
  { icon: '📸', title: 'Fotografia', desc: 'Immagini che documentano la realtà dei conflitti e la resistenza quotidiana degli studenti in zone di guerra.' },
  { icon: '🎵', title: 'Musica & Spoken Word', desc: 'Canzoni, poesie, testi. La voce come strumento di protesta. Dal punk alle note ambient, ogni genere è benvenuto.' },
  { icon: '🎬', title: 'Video & Documentari', desc: 'Cortometraggi, video-arte, interviste. Le storie che i media mainstream non raccontano.' },
  { icon: '🖌️', title: 'Street Art & Muralismo', desc: 'Le strade come galleria pubblica. Arte che non chiede permesso perché la pace non dovrebbe chiederlo.' },
  { icon: '📖', title: 'Scrittura & Poesia', desc: 'Racconti, saggi, poesie. Perché a volte basta una frase per cambiare il modo in cui qualcuno vede il mondo.' },
]

const FEATURED_ARTISTS = [
  {
    name: 'Artista #001',
    country: 'Ucraina',
    statement: 'La mia arte nasce dalla necessità di trasformare il trauma in qualcosa che possa essere guardato, compreso, condiviso. Non cerco pietà. Cerco consapevolezza.',
    medium: 'Illustrazione digitale',
    placeholder: '🇺🇦',
  },
  {
    name: 'Artista #002',
    country: 'Palestina',
    statement: 'Dipingo quello che i telegiornali non trasmettono: la vita ordinaria che continua nonostante tutto. I bambini che giocano. Le famiglie che cucinano. La normalità come atto di resistenza.',
    medium: 'Pittura acrilica',
    placeholder: '🇵🇸',
  },
  {
    name: 'Artista #003',
    country: 'Sudan',
    statement: 'Il colore giallo per me è la speranza. Il rosso è la verità che dobbiamo dire. Il nero è il silenzio che non possiamo più permetterci.',
    medium: 'Street art & muralismo',
    placeholder: '🇸🇩',
  },
]

export default function ArtForPeacePage() {
  return (
    <div className="min-h-screen bg-white pt-16">

      {/* HERO */}
      <section className="bg-black px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-6">
              <span className="stamp text-saw-yellow border-saw-yellow text-xs">
                SAWNation — Art Division
              </span>
            </div>
            <h1 className="stencil-title text-white leading-none mb-4" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
              <span className="block">ART</span>
              <span className="block text-saw-yellow">FOR</span>
              <span className="block">PEACE</span>
            </h1>
            <p className="font-oswald text-gray-300 text-xl leading-relaxed mb-8">
              L'arte è l'unica arma che non uccide. Artisti da tutto il mondo usano
              creatività, cultura e bellezza per sfidare la narrativa della guerra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-yellow px-8 py-4 text-xl">
                INVIA LA TUA OPERA →
              </button>
              <Link href="/passaporto" className="btn-protest px-8 py-4 text-xl">
                DIVENTA CITTADINO
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-saw-yellow thick-border p-8 flex items-center justify-center text-6xl aspect-square">🎨</div>
            <div className="bg-saw-red thick-border p-8 flex items-center justify-center text-6xl aspect-square">✏️</div>
            <div className="bg-white thick-border p-8 flex items-center justify-center text-6xl aspect-square">📸</div>
            <div className="bg-saw-blue thick-border p-8 flex items-center justify-center text-6xl aspect-square">🎵</div>
          </div>
        </div>
      </section>

      {/* PROTEST LINE */}
      <div className="protest-line" />

      {/* MANIFESTO ARTISTICO */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-oswald text-xs uppercase tracking-widest text-gray-500 mb-3">— Manifesto Artistico</p>
            <h2 className="stencil-title text-black text-5xl md:text-6xl mb-4">
              PERCHÉ L'ARTE<br />CAMBIA TUTTO
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MANIFESTO.map((item, i) => (
              <div key={i} className={`p-8 thick-border ${i === 1 ? 'bg-saw-yellow text-black' : 'bg-white text-black'}`}>
                <div className="stencil-title text-4xl opacity-10 mb-2">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="stencil-title text-2xl mb-4">{item.title}</h3>
                <p className="font-oswald text-base leading-relaxed opacity-80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROTEST LINE */}
      <div className="protest-line" />

      {/* ARTISTI IN EVIDENZA */}
      <section className="bg-saw-paper px-6 py-16" style={{ background: '#F5F0E8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-2 w-12 bg-black" />
            <h2 className="stencil-title text-black text-4xl md:text-5xl">ARTISTI IN EVIDENZA</h2>
            <div className="h-2 flex-1 bg-black" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_ARTISTS.map((artist, i) => (
              <div key={i} className="bg-white thick-border overflow-hidden">
                <div className="bg-black p-8 flex items-center justify-center text-6xl aspect-video">
                  {artist.placeholder}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="stencil-title text-xl text-black">{artist.name}</div>
                    <div className="font-oswald text-xs uppercase text-saw-red font-bold">{artist.country}</div>
                  </div>
                  <p className="manifesto-text text-sm text-gray-600 leading-relaxed italic mb-4">
                    "{artist.statement}"
                  </p>
                  <div className="bg-saw-yellow px-3 py-1 inline-block">
                    <span className="font-oswald text-xs font-bold text-black uppercase">{artist.medium}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROTEST LINE */}
      <div className="protest-line" />

      {/* CATEGORIE */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="stencil-title text-black text-5xl md:text-6xl mb-4">
              ART OF RESISTANCE
            </h2>
            <p className="font-oswald text-gray-600 text-lg">
              Ogni forma d'arte è benvenuta. Ogni voce conta.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className={`thick-border p-6 ${i % 3 === 1 ? 'bg-saw-yellow' : 'bg-white'}`}>
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="stencil-title text-xl mb-3 text-black">{cat.title}</h3>
                <p className="font-oswald text-sm leading-relaxed text-black/70">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROTEST LINE */}
      <div className="protest-line" />

      {/* COME PARTECIPARE */}
      <section className="bg-black px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="stencil-title text-white text-5xl md:text-6xl mb-4">
              COME PARTECIPARE
            </h2>
            <p className="font-oswald text-gray-400 text-lg">
              Il processo è semplice. L'impatto non lo è.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {[
              { step: '01', title: 'Diventa cittadino', desc: 'Crea il tuo passaporto SAWNation. È il tuo accesso alla piattaforma.' },
              { step: '02', title: 'Crea la tua opera', desc: 'Qualsiasi formato. Qualsiasi tema legato a pace, guerra, diritti. Nessun limite stilistico.' },
              { step: '03', title: 'Invia e racconta', desc: 'Carica l\'opera e scrivi il tuo statement artistico. Perché l\'hai creata. Cosa vuoi comunicare.' },
              { step: '04', title: 'Il mondo la vede', desc: 'La gallery è pubblica e globale. I migliori lavori vengono promossi sui canali SAWNation.' },
            ].map((item) => (
              <div key={item.step} className="bg-white thick-border p-6">
                <div className="stencil-title text-5xl text-saw-yellow mb-3">{item.step}</div>
                <h3 className="stencil-title text-xl text-black mb-2">{item.title}</h3>
                <p className="font-oswald text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-block bg-saw-yellow thick-border p-8 mb-8 max-w-xl text-left">
              <h3 className="stencil-title text-black text-2xl mb-3">LINEE GUIDA EDITORIALI</h3>
              <ul className="font-oswald text-black text-sm space-y-2">
                <li>✓ Contenuto originale e inedito</li>
                <li>✓ Tema connesso a pace, guerra, giustizia sociale, diritti</li>
                <li>✓ Statement artistico obbligatorio (min. 50 parole)</li>
                <li>✗ Nessun contenuto che inciti all'odio o alla violenza</li>
                <li>✗ Nessuna propaganda di parte — l'arte osserva, non obbedisce</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-yellow px-12 py-5 text-2xl">
                INVIA LA TUA OPERA →
              </button>
              <Link href="/passaporto" className="btn-protest px-12 py-5 text-2xl">
                CREA IL TUO PASSAPORTO
              </Link>
            </div>
            <p className="font-oswald text-gray-600 text-sm mt-6 uppercase tracking-wide">
              Devi essere un cittadino SAWNation per inviare opere. Passaporto: 2€, una tantum.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
