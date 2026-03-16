'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Spokesperson } from '@/lib/supabase'

export default function AntiParlamentoPage() {
  const [current, setCurrent] = useState<Spokesperson | null>(null)
  const [past, setPast] = useState<Spokesperson[]>([])
  const [loading, setLoading] = useState(true)
  const [daysLeft, setDaysLeft] = useState(0)
  const [hoursLeft, setHoursLeft] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const { data: curr } = await supabase
        .from('spokespersons')
        .select('*, citizen:citizens(*)')
        .eq('is_active', true)
        .single()

      if (curr) {
        setCurrent(curr)
        const end = new Date(curr.week_end)
        const diff = end.getTime() - Date.now()
        setDaysLeft(Math.max(0, Math.floor(diff / 86400000)))
        setHoursLeft(Math.max(0, Math.floor((diff % 86400000) / 3600000)))
      }

      const { data: pastData } = await supabase
        .from('spokespersons')
        .select('*, citizen:citizens(*)')
        .eq('is_active', false)
        .order('week_start', { ascending: false })
        .limit(10)

      setPast(pastData ?? [])
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-white pt-16">

      {/* HERO */}
      <section className="bg-black border-b-4 border-white px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <p className="font-oswald text-xs uppercase tracking-widest text-gray-400 mb-3">— Democrazia radicale</p>
          <h1 className="stencil-title text-white text-5xl md:text-7xl leading-none mb-4">
            L'ANTI-<br />
            <span className="text-saw-yellow">PARLAMENTO</span>
          </h1>
          <p className="font-oswald text-gray-300 text-lg max-w-2xl leading-relaxed mb-6">
            Un portavoce eletto ogni 7 giorni, da un paese diverso, sempre under 30, sempre studente, mai rieletto.
            Nessun partito. Nessuna carriera. Solo 7 giorni di voce autentica —
            poi si passa ad un altro. Come la democrazia dovrebbe funzionare.
          </p>
          <div className="inline-block border-2 border-white px-4 py-2">
            <span className="font-oswald font-bold text-white text-sm uppercase tracking-wide">
              Regola fondamentale: chi è stato portavoce non potrà esserlo mai più. Nessuna eccezione.
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {loading ? (
          <div className="text-center py-20 border-3 border-black">
            <p className="stencil-title text-black text-2xl">Caricamento in corso...</p>
          </div>
        ) : (
          <>
            {/* Current Spokesperson */}
            {current ? (
              <div className="glass mb-10 overflow-hidden">
                <div className="bg-black border-b-3 border-black px-6 py-3 flex items-center gap-3">
                  <div className="pulse-dot" />
                  <span className="font-oswald font-bold text-white text-sm uppercase tracking-widest">Portavoce Attuale</span>
                </div>
                <div className="p-8">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-24 h-24 border-3 border-black flex items-center justify-center text-4xl flex-shrink-0 bg-gray-100">
                      {current.citizen?.photo_url ? (
                        <img src={current.citizen.photo_url} alt="" className="w-full h-full object-cover" />
                      ) : '👤'}
                    </div>

                    <div className="flex-1">
                      <h2 className="stencil-title text-black text-3xl">{current.citizen?.name ?? 'Anonimo'}</h2>
                      <p className="font-oswald text-saw-red font-bold uppercase tracking-wide">{current.country}</p>
                      {current.citizen?.university && (
                        <p className="font-oswald text-gray-600 text-sm mt-1">{current.citizen.university}</p>
                      )}

                      <div className="flex flex-wrap gap-3 mt-4">
                        <div className="bg-saw-red thick-border px-4 py-2 text-center text-white">
                          <div className="stencil-title text-2xl">{daysLeft}g {hoursLeft}h</div>
                          <div className="font-oswald text-xs uppercase opacity-80">rimanenti</div>
                        </div>
                        <div className="glass px-4 py-2 text-center">
                          <div className="stencil-title text-black text-2xl">#{String(current.citizen?.citizen_number ?? 0).padStart(6, '0')}</div>
                          <div className="font-oswald text-gray-500 text-xs uppercase">numero cittadino</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {current.message && (
                    <div className="mt-8 border-l-4 border-black pl-6 bg-saw-paper py-4 pr-4" style={{ background: '#F5F0E8' }}>
                      <p className="manifesto-text text-black text-lg leading-relaxed">"{current.message}"</p>
                      <p className="font-oswald text-gray-500 text-sm mt-3 uppercase tracking-wide">— {current.citizen?.name}, Portavoce SAWNation</p>
                    </div>
                  )}

                  <div className="mt-6 font-oswald text-xs text-gray-500 uppercase tracking-wide">
                    Non potrà mai essere rieletto. Fine mandato: {new Date(current.week_end).toLocaleDateString('it-IT')}
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass p-8 mb-10 text-center">
                <div className="stencil-title text-5xl mb-4">🗳️</div>
                <h2 className="stencil-title text-black text-3xl mb-2">Elezione in corso</h2>
                <p className="font-oswald text-gray-600">Il prossimo portavoce viene eletto a breve. Diventa cittadino per votare.</p>
              </div>
            )}

            {/* Rules */}
            <div className="glass p-8 mb-10">
              <h2 className="stencil-title text-black text-2xl mb-6">LE 3 REGOLE ASSOLUTE</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: '🚫', title: 'Non rieletto mai', desc: 'Una sola volta nella vita. Per sempre. Nessuna eccezione, nessun compromesso. Chi ha avuto il microfono lo passa.' },
                  { icon: '🏛️', title: 'Nessun partito', desc: "Zero affiliazioni politiche dichiarate. Il portavoce parla a nome degli studenti del mondo, non di un'ideologia." },
                  { icon: '💯', title: 'Solo la verità', desc: 'I messaggi pubblici devono essere basati su fatti verificabili, con lo stesso rigore del Tribunale dei Capi.' },
                ].map((rule) => (
                  <div key={rule.title} className={`p-6 thick-border ${rule.icon === '🚫' ? 'bg-saw-red text-white' : rule.icon === '🏛️' ? 'bg-saw-yellow text-black' : 'bg-black text-white'}`}>
                    <div className="text-3xl mb-3">{rule.icon}</div>
                    <div className="stencil-title text-xl mb-2">{rule.title}</div>
                    <div className="font-oswald text-sm leading-relaxed opacity-80">{rule.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Spokespersons */}
            {past.length > 0 && (
              <div>
                <h2 className="stencil-title text-black text-3xl mb-6">PORTAVOCE PRECEDENTI</h2>
                <div className="space-y-2">
                  {past.map((sp) => (
                    <div key={sp.id} className="glass p-4 flex items-center justify-between">
                      <div>
                        <span className="font-oswald font-bold text-black uppercase">{sp.citizen?.name ?? 'Anonimo'}</span>
                        <span className="font-oswald text-saw-red ml-3 text-sm uppercase font-bold">{sp.country}</span>
                      </div>
                      <div className="font-oswald text-gray-500 text-sm">
                        {new Date(sp.week_start).toLocaleDateString('it-IT')} — {new Date(sp.week_end).toLocaleDateString('it-IT')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
