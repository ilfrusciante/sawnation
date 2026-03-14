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
    <div className="min-h-screen bg-black pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🗳️</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            L'Anti-Parlamento
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ogni settimana si elegge un portavoce da un paese diverso.
            Sempre under 30. Sempre studente. Sempre 7 giorni soli.
            Non rieletto mai. Nessun partito. Solo la verità.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Caricamento...</div>
        ) : (
          <>
            {/* Current Spokesperson */}
            {current ? (
              <div className="glass rounded-2xl p-8 mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="pulse-dot" />
                  <span className="text-[#CC0000] font-bold text-sm uppercase tracking-widest">Portavoce Attuale</span>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-24 h-24 rounded-2xl bg-[#CC0000]/10 border-2 border-[#CC0000]/30 flex items-center justify-center text-4xl flex-shrink-0">
                    {current.citizen?.photo_url ? (
                      <img src={current.citizen.photo_url} alt="" className="w-full h-full rounded-2xl object-cover" />
                    ) : '👤'}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-white">{current.citizen?.name ?? 'Anonimo'}</h2>
                    <p className="text-[#CC0000] font-bold">{current.country}</p>
                    {current.citizen?.university && (
                      <p className="text-gray-400 text-sm mt-1">{current.citizen.university}</p>
                    )}

                    <div className="flex flex-wrap gap-3 mt-4">
                      <div className="bg-[#CC0000]/10 border border-[#CC0000]/20 rounded-xl px-4 py-2 text-center">
                        <div className="text-[#CC0000] font-black text-xl">{daysLeft}g {hoursLeft}h</div>
                        <div className="text-gray-500 text-xs">rimanenti</div>
                      </div>
                      <div className="bg-white/3 border border-white/10 rounded-xl px-4 py-2 text-center">
                        <div className="text-white font-black text-xl">#{String(current.citizen?.citizen_number ?? 0).padStart(6, '0')}</div>
                        <div className="text-gray-500 text-xs">numero cittadino</div>
                      </div>
                    </div>
                  </div>
                </div>

                {current.message && (
                  <div className="mt-8 border-l-4 border-[#CC0000] pl-6">
                    <p className="text-gray-200 text-lg leading-relaxed italic">"{current.message}"</p>
                    <p className="text-gray-500 text-sm mt-3">— {current.citizen?.name}, Portavoce SAWNation</p>
                  </div>
                )}

                <div className="mt-6 text-xs text-gray-600">
                  Non potrà mai essere rieletto. Fine mandato: {new Date(current.week_end).toLocaleDateString('it-IT')}
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-8 mb-10 text-center">
                <div className="text-5xl mb-4">🗳️</div>
                <h2 className="text-2xl font-black text-white mb-2">Elezione in corso</h2>
                <p className="text-gray-400">Il prossimo portavoce viene eletto presto. Diventa cittadino per votare.</p>
              </div>
            )}

            {/* Rules */}
            <div className="glass rounded-2xl p-8 mb-10">
              <h2 className="text-xl font-black text-white mb-6">Le 3 Regole Assolute del Portavoce</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: '🚫', title: 'Non rieletto mai', desc: 'Una sola volta. Per sempre. Nessuna eccezione.' },
                  { icon: '🏛️', title: 'Nessun partito', desc: 'Zero affiliazioni politiche. Parla a nome degli studenti.' },
                  { icon: '💯', title: 'Solo la verità', desc: 'Messaggi basati su fatti. Come il Tribunale dei Capi.' },
                ].map((rule) => (
                  <div key={rule.title} className="bg-white/3 rounded-xl p-5 text-center">
                    <div className="text-3xl mb-3">{rule.icon}</div>
                    <div className="font-black text-white mb-2">{rule.title}</div>
                    <div className="text-gray-500 text-sm">{rule.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Spokespersons */}
            {past.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-white mb-6">Portavoce Precedenti</h2>
                <div className="space-y-3">
                  {past.map((sp) => (
                    <div key={sp.id} className="glass rounded-xl p-5 flex items-center justify-between">
                      <div>
                        <span className="text-white font-bold">{sp.citizen?.name ?? 'Anonimo'}</span>
                        <span className="text-[#CC0000] ml-3 text-sm">{sp.country}</span>
                      </div>
                      <div className="text-gray-500 text-sm">
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
