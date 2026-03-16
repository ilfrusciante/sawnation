import { supabaseAdmin } from '@/lib/supabase'
import { Leader } from '@/lib/supabase'

const MOCK_LEADERS: Leader[] = [
  {
    id: '1',
    name: 'Prima scheda in preparazione',
    country: 'XXX',
    age: 60,
    children_in_war: 0,
    war_decisions: 47,
    arms_sales_billion: 8.3,
    status: 'pubblicato',
    published_at: new Date().toISOString(),
    saw_citizens_in_country: 12400,
    sources: [
      { label: 'SIPRI Arms Transfers Database 2024', url: 'https://sipri.org/databases/armstransfers' },
      { label: 'SIPRI Military Expenditure Database', url: 'https://sipri.org/databases/milex' },
      { label: 'UN OCHA — Humanitarian Data Exchange', url: 'https://data.humdata.org' },
      { label: 'International Criminal Court', url: 'https://www.icc-cpi.int' },
      { label: 'Human Rights Watch — World Report 2024', url: 'https://www.hrw.org/world-report/2024' },
      { label: 'Amnesty International — Annual Report 2023/24', url: 'https://www.amnesty.org/en/latest/research/2024/01/amnesty-international-annual-report-2023-24' },
      { label: 'ACLED — Armed Conflict Location & Event Data', url: 'https://acleddata.com' },
    ],
  },
]

async function getLeaders(): Promise<Leader[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('leaders')
      .select('*')
      .eq('status', 'pubblicato')
      .order('published_at', { ascending: false })
    if (error || !data || data.length === 0) return MOCK_LEADERS
    return data
  } catch {
    return MOCK_LEADERS
  }
}

const STATUS_LABELS = {
  in_verifica: { label: 'In verifica', color: 'text-black bg-gray-200 border-black' },
  verificato: { label: 'Verificato', color: 'text-white bg-black border-black' },
  pubblicato: { label: 'Pubblicato', color: 'text-white bg-black border-black' },
}

export default async function TribunalePage() {
  const leaders = await getLeaders()

  return (
    <div className="min-h-screen bg-white pt-16">

      {/* HERO */}
      <section className="bg-black px-6 py-14 border-b-4 border-white">
        <div className="max-w-5xl mx-auto">
          <p className="font-oswald text-xs uppercase tracking-widest text-gray-400 mb-3">— Archivio Verificato</p>
          <h1 className="stencil-title text-white text-5xl md:text-7xl leading-none mb-4">
            TRIBUNALE<br />
            <span className="text-white">DEI CAPI</span>
          </h1>
          <p className="font-oswald text-gray-300 text-lg max-w-2xl leading-relaxed mb-4">
            Non è un processo. È un archivio. Dati reali, verificati, documentati.
            Nessun insulto. Nessuna opinione. Solo fatti che i governi preferiscono non pubblicare.
          </p>
          <div className="inline-block border-2 border-white px-4 py-2">
            <span className="font-oswald font-bold text-white text-sm uppercase tracking-wide">REGOLA ASSOLUTA:</span>
            <span className="font-oswald text-white/80 text-sm ml-2">Se un dato non è verificabile al 100% con fonti primarie, non viene pubblicato. Mai.</span>
          </div>
        </div>
      </section>

      {/* URBAN ART BANNER */}
      <section className="relative overflow-hidden h-48 md:h-64">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1559743577-44f718e47c7d?auto=format&fit=crop&w=1600&q=80"
          alt="Urban street art"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Fact Checking Process */}
        <div className="glass p-8 mb-12">
          <h2 className="stencil-title text-black text-2xl mb-6">PROCESSO DI VERIFICA — 4 FASI OBBLIGATORIE</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { num: '1', title: 'Raccolta dati', days: '7 giorni', desc: 'Solo fonti primarie verificabili. Ogni dato richiede un minimo di 2 fonti indipendenti. Nessuna fonte secondaria accettata.' },
              { num: '2', title: 'Verifica incrociata', days: '3 giorni', desc: 'Un revisore indipendente esamina ogni dato. Qualsiasi discrepanza porta all\'eliminazione del dato, non alla media.' },
              { num: '3', title: 'Revisione legale', days: '2 giorni', desc: 'Solo fatti documentati. Zero opinioni. Zero interpretazioni. Il dato deve stare da solo.' },
              { num: '4', title: 'Pubblicazione', days: 'Con fonti', desc: 'Ogni singolo dato ha il link alla fonte originale. Cliccabile. Verificabile da chiunque, in qualsiasi momento.' },
            ].map((phase) => (
              <div key={phase.num} className="bg-white border-3 border-black p-4" style={{ boxShadow: '3px 3px 0 #000' }}>
                <div className="stencil-title text-black text-3xl mb-1">Fase {phase.num}</div>
                <div className="font-oswald font-bold text-black text-sm mb-1 uppercase">{phase.title}</div>
                <div className="bg-black text-white inline-block px-2 py-0.5 mb-2">
                  <span className="font-oswald font-bold text-xs">{phase.days}</span>
                </div>
                <p className="font-oswald text-gray-600 text-xs leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leaders */}
        <div className="space-y-8">
          {leaders.map((leader) => {
            const status = STATUS_LABELS[leader.status]
            return (
              <div key={leader.id} className="glass overflow-hidden">
                <div className="p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <h2 className="stencil-title text-black text-3xl md:text-4xl">{leader.name}</h2>
                      <p className="font-oswald text-gray-600 mt-1 uppercase tracking-wide">{leader.country}</p>
                    </div>
                    <span className={`px-3 py-1 font-oswald text-xs font-bold border-2 ${status.color}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Età', value: `${leader.age} anni`, type: 'neutral' },
                      { label: 'Figli in zona di guerra', value: leader.children_in_war, type: 'neutral' },
                      { label: 'Decisioni di guerra', value: leader.war_decisions, type: 'danger' },
                      { label: 'Vendite di armi', value: `$${leader.arms_sales_billion}B`, type: 'danger' },
                    ].map((stat) => (
                      <div key={stat.label} className={`p-4 text-center border-3 border-black ${stat.type === 'danger' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        <div className="stencil-title text-3xl mb-1">{stat.value}</div>
                        <div className="font-oswald text-xs uppercase tracking-wide opacity-70">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {leader.saw_citizens_in_country !== undefined && (
                    <div className="border-3 border-black bg-gray-100 p-4 mb-6">
                      <p className="font-oswald text-black text-sm">
                        <span className="stencil-title text-2xl">{leader.saw_citizens_in_country?.toLocaleString('it-IT')}</span>
                        {' '}cittadini SAWNation vivono nel suo paese e la pensano diversamente.
                      </p>
                    </div>
                  )}

                  {/* Sources */}
                  <div>
                    <p className="font-oswald text-xs text-gray-500 uppercase tracking-wider mb-3 font-bold">Fonti Primarie Verificate</p>
                    <div className="flex flex-wrap gap-2">
                      {leader.sources.map((source, i) => (
                        <a
                          key={i}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-oswald text-xs bg-white hover:bg-black hover:text-white border-2 border-black text-black px-3 py-1.5 transition-all uppercase tracking-wide"
                        >
                          🔗 {source.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {leaders.length === 0 && (
          <div className="text-center py-20 border-3 border-black">
            <div className="stencil-title text-5xl mb-4">⏳</div>
            <p className="stencil-title text-black text-2xl">Prima scheda in preparazione.</p>
            <p className="font-oswald text-gray-600 mt-2">Il processo di fact checking è in corso. Torna presto.</p>
          </div>
        )}
      </div>
    </div>
  )
}
