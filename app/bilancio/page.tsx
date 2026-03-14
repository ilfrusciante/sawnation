'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Transaction, ScholarStudent } from '@/lib/supabase'

type BudgetTotals = {
  total_in: number
  total_students: number
  total_platform: number
  passports_today: number
  active_scholars: number
}

export default function BilancioPage() {
  const [totals, setTotals] = useState<BudgetTotals>({
    total_in: 0, total_students: 0, total_platform: 0, passports_today: 0, active_scholars: 0,
  })
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [scholars, setScholars] = useState<ScholarStudent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      // Totals
      const { data: txData } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (txData) {
        setTransactions(txData)
        const totalIn = txData.reduce((s, t) => s + t.amount, 0)
        const totalStudents = txData.reduce((s, t) => s + t.fund_students, 0)
        const totalPlatform = txData.reduce((s, t) => s + t.fund_platform, 0)

        const today = new Date().toDateString()
        const passportsToday = txData.filter(t =>
          t.type === 'passport' && new Date(t.created_at).toDateString() === today
        ).length

        setTotals({ total_in: totalIn, total_students: totalStudents, total_platform: totalPlatform, passports_today: passportsToday, active_scholars: 0 })
      }

      // Scholars
      const { data: scholarsData } = await supabase
        .from('scholar_students')
        .select('*')
        .order('grant_start', { ascending: false })

      setScholars(scholarsData ?? [])
      setTotals(prev => ({ ...prev, active_scholars: scholarsData?.length ?? 0 }))
      setLoading(false)
    }

    fetchData()

    // Real-time
    const channel = supabase
      .channel('budget')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'transactions' }, (payload) => {
        const t = payload.new as Transaction
        setTransactions(prev => [t, ...prev])
        setTotals(prev => ({
          ...prev,
          total_in: prev.total_in + t.amount,
          total_students: prev.total_students + t.fund_students,
          total_platform: prev.total_platform + t.fund_platform,
          passports_today: t.type === 'passport' ? prev.passports_today + 1 : prev.passports_today,
        }))
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const fmt = (n: number) => `€${n.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Il Bilancio della Nazione
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            SAWNation è la prima nazione nella storia con un bilancio pubblico completamente trasparente e in tempo reale.
          </p>
          <p className="text-[#CC0000] font-bold italic mt-4">
            "Quello che i governi nascondono, noi lo mostriamo. In tempo reale. A tutti."
          </p>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Totale entrate', value: fmt(totals.total_in), sub: 'da sempre', live: true },
            { label: 'Fondo studenti', value: fmt(totals.total_students), sub: '80% di tutto', highlight: true },
            { label: 'Passaporti oggi', value: totals.passports_today.toString(), sub: 'nuovi cittadini', live: true },
            { label: 'Studenti finanziati', value: totals.active_scholars.toString(), sub: 'attualmente attivi' },
          ].map((stat) => (
            <div key={stat.label} className={`glass rounded-2xl p-6 text-center ${stat.highlight ? 'border-[#CC0000]/40' : ''}`}>
              {stat.live && (
                <div className="flex items-center justify-center gap-1 mb-2">
                  <div className="pulse-dot" />
                  <span className="text-[#CC0000] text-xs font-bold">LIVE</span>
                </div>
              )}
              <div className={`text-2xl font-black ${stat.highlight ? 'text-[#CC0000]' : 'text-white'} tabular-nums`}>
                {loading ? '...' : stat.value}
              </div>
              <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
              <div className="text-gray-600 text-xs">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Distribution */}
        <div className="glass rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-black text-white mb-6">Distribuzione Fissa e Immutabile</h2>
          <div className="space-y-3">
            {[
              'Carta d\'identità digitale (2€)',
              'Sponsorship atenei',
              'Evento annuale',
              'Donazioni volontarie',
            ].map((source) => (
              <div key={source} className="flex items-center gap-4 bg-white/3 rounded-xl p-4">
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">{source}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-[#CC0000]/10 border border-[#CC0000]/20 rounded-lg px-3 py-1.5">
                    <div className="w-2 h-2 bg-[#CC0000] rounded-full" />
                    <span className="text-[#CC0000] font-black text-sm">80%</span>
                    <span className="text-gray-500 text-xs">studenti</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                    <span className="text-gray-300 font-bold text-sm">20%</span>
                    <span className="text-gray-500 text-xs">piattaforma</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Visual bar */}
          <div className="mt-6">
            <div className="flex rounded-full overflow-hidden h-4">
              <div className="bg-[#CC0000] h-full" style={{ width: '80%' }} />
              <div className="bg-white/20 h-full" style={{ width: '20%' }} />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>80% — Fondo Studenti in Guerra</span>
              <span>20% — Piattaforma e Stipendi</span>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="glass rounded-2xl p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="pulse-dot" />
            <h2 className="text-xl font-black text-white">Transazioni in Tempo Reale</h2>
          </div>
          {transactions.length > 0 ? (
            <div className="space-y-2">
              {transactions.slice(0, 20).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between bg-white/3 rounded-xl px-4 py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {tx.type === 'passport' ? '🛂' : tx.type === 'donation' ? '💚' : tx.type === 'sponsorship' ? '🎓' : '🎪'}
                    </span>
                    <div>
                      <div className="text-white font-semibold">{tx.description}</div>
                      <div className="text-gray-500 text-xs">{new Date(tx.created_at).toLocaleString('it-IT')}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{fmt(tx.amount)}</div>
                    <div className="text-[#CC0000] text-xs">{fmt(tx.fund_students)} → studenti</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Prime transazioni in arrivo...</p>
            </div>
          )}
        </div>

        {/* Scholar Students */}
        <div>
          <h2 className="text-2xl font-black text-white mb-6">
            🎓 Gli Studenti Finanziati — Profili Pubblici
          </h2>
          <p className="text-gray-400 mb-8">Non sono numeri. Sono persone reali. Questo è il cuore emotivo di SAWNation.</p>

          {scholars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scholars.map((student) => (
                <div key={student.id} className="glass rounded-2xl p-6">
                  <div className="flex gap-4 mb-4">
                    {student.photo_url ? (
                      <img src={student.photo_url} alt="" className="w-16 h-16 rounded-xl object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-[#CC0000]/10 flex items-center justify-center text-2xl">👤</div>
                    )}
                    <div>
                      <h3 className="text-white font-black">{student.name}</h3>
                      <p className="text-gray-400 text-sm">{student.age} anni — {student.country}</p>
                      <p className="text-gray-500 text-xs">{student.university} · {student.field_of_study}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3 italic">"{student.story}"</p>
                  <p className="text-[#CC0000] text-sm font-semibold">Sogno: {student.dream}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-gray-500 text-xs">Borsa mensile</div>
                    <div className="text-white font-black">{fmt(student.monthly_grant)}/mese</div>
                  </div>
                  <button className="mt-4 w-full border border-[#CC0000]/30 hover:bg-[#CC0000]/5 text-[#CC0000] font-bold py-2 rounded-xl text-sm transition-all">
                    ✉️ Scrivi a {student.name.split(' ')[0]}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 glass rounded-2xl">
              <div className="text-5xl mb-4">🎓</div>
              <p className="text-lg">Primo studente in selezione. Presto pubblico.</p>
              <p className="text-sm mt-2">Le borse di studio vengono assegnate non appena raggiungiamo il primo obiettivo di finanziamento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
