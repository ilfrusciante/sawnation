import { supabaseAdmin } from '@/lib/supabase'
import { Leader } from '@/lib/supabase'

// Mock data for demo — will be replaced by Supabase data
const MOCK_LEADERS: Leader[] = [
  {
    id: '1',
    name: 'Esempio — Scheda in Pubblicazione',
    country: 'XXX',
    age: 60,
    children_in_war: 0,
    war_decisions: 47,
    arms_sales_billion: 8.3,
    status: 'pubblicato',
    published_at: new Date().toISOString(),
    saw_citizens_in_country: 12400,
    sources: [
      { label: 'ONU SIPRI Database 2024', url: 'https://sipri.org' },
      { label: 'Reuters Report 2024', url: 'https://reuters.com' },
    ],
  },
]

async function getLeaders(): Promise<Leader[]> {
  try {
    const { data } = await supabaseAdmin
      .from('leaders')
      .select('*')
      .eq('status', 'pubblicato')
      .order('published_at', { ascending: false })
    return data && data.length > 0 ? data : MOCK_LEADERS
  } catch {
    return MOCK_LEADERS
  }
}

const STATUS_LABELS = {
  in_verifica: { label: 'In verifica', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  verificato: { label: 'Verificato', color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
  pubblicato: { label: 'Pubblicato', color: 'text-green-400 bg-green-400/10 border-green-400/30' },
}

export default async function TribunalePage() {
  const leaders = await getLeaders()

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">⚖️</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Il Tribunale dei Capi
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Solo dati reali, verificati e documentati. Nessun insulto. Nessuna opinione.
            Solo fatti devastanti.
          </p>
          <div className="mt-6 inline-block bg-[#CC0000]/10 border border-[#CC0000]/30 rounded-full px-6 py-2">
            <span className="text-[#CC0000] font-bold text-sm">REGOLA ASSOLUTA:</span>
            <span className="text-gray-400 text-sm ml-2">Se un dato non è verificabile al 100% non viene pubblicato. Mai.</span>
          </div>
        </div>

        {/* Fact Checking Process */}
        <div className="glass rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-black text-white mb-6">⚠️ Processo di Fact Checking Obbligatorio — 4 Fasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { num: '1', title: 'Raccolta dati', days: '7 giorni', desc: 'Solo fonti primarie verificabili. Ogni dato: min. 2 fonti indipendenti.' },
              { num: '2', title: 'Verifica incrociata', days: '3 giorni', desc: 'Revisore indipendente. Discrepanze = dato eliminato.' },
              { num: '3', title: 'Revisione legale', days: '2 giorni', desc: 'Solo fatti documentati. Zero opinioni. Nessuna eccezione.' },
              { num: '4', title: 'Pubblicazione', days: 'Con fonti', desc: 'Ogni dato ha il link alla fonte originale. Cliccabile da tutti.' },
            ].map((phase) => (
              <div key={phase.num} className="bg-white/3 rounded-xl p-4">
                <div className="text-[#CC0000] font-black text-2xl mb-1">Fase {phase.num}</div>
                <div className="text-white font-bold text-sm mb-1">{phase.title}</div>
                <div className="text-[#CC0000]/70 text-xs font-bold mb-2">{phase.days}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leaders */}
        <div className="space-y-8">
          {leaders.map((leader) => {
            const status = STATUS_LABELS[leader.status]
            return (
              <div key={leader.id} className="glass rounded-2xl overflow-hidden">
                <div className="p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-black text-white">{leader.name}</h2>
                      <p className="text-gray-400 mt-1">{leader.country}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${status.color}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Età', value: `${leader.age} anni` },
                      { label: 'Figli in guerra', value: leader.children_in_war, highlight: leader.children_in_war === 0 },
                      { label: 'Decisioni di guerra', value: leader.war_decisions, danger: true },
                      { label: 'Vendite armi', value: `$${leader.arms_sales_billion}B`, danger: true },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/3 rounded-xl p-4 text-center">
                        <div className={`text-2xl font-black mb-1 ${stat.danger ? 'text-[#CC0000]' : stat.highlight ? 'text-green-400' : 'text-white'}`}>
                          {stat.value}
                        </div>
                        <div className="text-gray-500 text-xs">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {leader.saw_citizens_in_country !== undefined && (
                    <div className="bg-[#CC0000]/5 border border-[#CC0000]/20 rounded-xl p-4 mb-6">
                      <p className="text-gray-300 text-sm">
                        <span className="text-[#CC0000] font-black">{leader.saw_citizens_in_country?.toLocaleString('it-IT')}</span>
                        {' '}cittadini SAWNation vivono nel suo paese e la pensano diversamente.
                      </p>
                    </div>
                  )}

                  {/* Sources */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-bold">Fonti Verificate</p>
                    <div className="flex flex-wrap gap-2">
                      {leader.sources.map((source, i) => (
                        <a
                          key={i}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-white/5 hover:bg-[#CC0000]/10 border border-white/10 hover:border-[#CC0000]/30 text-gray-400 hover:text-white px-3 py-1.5 rounded-full transition-all"
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
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">⏳</div>
            <p className="text-lg">Prima scheda in preparazione. Fact checking in corso.</p>
          </div>
        )}
      </div>
    </div>
  )
}
