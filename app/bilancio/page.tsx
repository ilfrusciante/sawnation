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

      const { data: scholarsData } = await supabase
        .from('scholar_students')
        .select('*')
        .order('grant_start', { ascending: false })

      setScholars(scholarsData ?? [])
      setTotals(prev => ({ ...prev, active_scholars: scholarsData?.length ?? 0 }))
      setLoading(false)
    }

    fetchData()

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
    <div className="min-h-screen bg-white pt-16">

      {/* HERO */}
      <section className="bg-black border-b-4 border-white px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <p className="font-oswald text-xs uppercase tracking-widest text-gray-400 mb-3">— Trasparenza radicale</p>
          <h1 className="stencil-title text-white text-5xl md:text-7xl leading-none mb-4">
            IL BILANCIO<br />
            <span className="text-black">DELLA NAZIONE</span>
          </h1>
          <p className="font-oswald text-gray-300 text-lg max-w-2xl leading-relaxed mb-4">
            SAWNation è la prima organizzazione nella storia con un bilancio pubblico,
            in tempo reale, verificabile da chiunque. Non perché siamo obbligati —
            ma perché crediamo che la fiducia si costruisca con i numeri, non con le parole.
          </p>
          <div className="inline-block border-2 border-white px-4 py-2">
            <span className="font-oswald font-bold text-white text-sm">
              "Quello che i governi nascondono, noi lo mostriamo. Ogni centesimo. In tempo reale."
            </span>
          </div>
        </div>
      </section>

      {/* URBAN ART BANNER */}
      <section className="relative overflow-hidden h-48 md:h-64">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1487452066049-a710f7296400?auto=format&fit=crop&w=1600&q=80"
          alt="Urban graffiti art"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Totale entrate', value: fmt(totals.total_in), sub: 'da sempre', live: true, bg: 'bg-white' },
            { label: 'Fondo studenti', value: fmt(totals.total_students), sub: '80% di tutto', highlight: true, bg: 'bg-black text-white' },
            { label: 'Passaporti oggi', value: totals.passports_today.toString(), sub: 'nuovi cittadini', live: true, bg: 'bg-white' },
            { label: 'Studenti finanziati', value: totals.active_scholars.toString(), sub: 'attivamente supportati', bg: 'bg-black text-white' as string },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} glass p-6 text-center`}>
              {stat.live && (
                <div className="flex items-center justify-center gap-1 mb-2">
                  <div className="pulse-dot" />
                  <span className={`font-oswald text-xs font-bold uppercase ${stat.bg === 'bg-black text-white' ? 'text-white' : 'text-black'}`}>LIVE</span>
                </div>
              )}
              <div className={`stencil-title text-3xl tabular-nums ${stat.highlight ? 'text-black' : stat.bg === 'bg-black text-white' ? 'text-white' : 'text-black'}`}>
                {loading ? '...' : stat.value}
              </div>
              <div className={`font-oswald text-xs mt-1 uppercase tracking-wide ${stat.bg === 'bg-black text-white' ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
              <div className={`font-oswald text-xs ${stat.bg === 'bg-black text-white' ? 'text-gray-600' : 'text-gray-400'}`}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Distribution */}
        <div className="glass p-8 mb-10">
          <h2 className="stencil-title text-black text-2xl mb-6">DISTRIBUZIONE FISSA E IMMUTABILE</h2>
          <p className="font-oswald text-gray-600 text-sm mb-6 leading-relaxed">
            La ripartizione è sancita dalla Costituzione SAWNation. Non può essere modificata da nessuno,
            nemmeno dai fondatori. È strutturale, non una scelta di marketing.
          </p>
          <div className="space-y-3 mb-6">
            {[
              'Registrazione passaporto (gratuita)',
              'Sponsorship atenei',
              'Evento annuale',
              'Donazioni volontarie',
            ].map((source) => (
              <div key={source} className="flex items-center gap-4 border-2 border-black p-4">
                <div className="flex-1">
                  <div className="font-oswald font-bold text-black text-sm uppercase tracking-wide">{source}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-black border-2 border-black px-3 py-1.5">
                    <span className="font-oswald font-black text-white text-sm">80%</span>
                    <span className="font-oswald text-white/80 text-xs">studenti</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black border-2 border-black px-3 py-1.5">
                    <span className="font-oswald font-bold text-white text-sm">20%</span>
                    <span className="font-oswald text-gray-400 text-xs">piattaforma</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex rounded-none overflow-hidden h-6 border-3 border-black">
            <div className="bg-black h-full flex items-center justify-center" style={{ width: '80%' }}>
              <span className="font-oswald font-black text-white text-xs">80%</span>
            </div>
            <div className="bg-black h-full flex items-center justify-center" style={{ width: '20%' }}>
              <span className="font-oswald font-bold text-white text-xs">20%</span>
            </div>
          </div>
          <div className="flex justify-between font-oswald text-xs text-gray-500 mt-2 uppercase tracking-wide">
            <span>Fondo Studenti in Zone di Conflitto</span>
            <span>Piattaforma e Operatività</span>
          </div>
        </div>

        {/* Transactions */}
        <div className="glass p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="pulse-dot" />
            <h2 className="stencil-title text-black text-2xl">TRANSAZIONI IN TEMPO REALE</h2>
          </div>
          {transactions.length > 0 ? (
            <div className="space-y-2">
              {transactions.slice(0, 20).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between border-2 border-black px-4 py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {tx.type === 'passport' ? '🛂' : tx.type === 'donation' ? '💚' : tx.type === 'sponsorship' ? '🎓' : '🎪'}
                    </span>
                    <div>
                      <div className="font-oswald font-bold text-black uppercase text-sm">{tx.description}</div>
                      <div className="font-oswald text-gray-500 text-xs">{new Date(tx.created_at).toLocaleString('it-IT')}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="stencil-title text-black text-lg">{fmt(tx.amount)}</div>
                    <div className="font-oswald text-black text-xs font-bold">{fmt(tx.fund_students)} → studenti</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-black">
              <p className="font-oswald text-gray-500 uppercase tracking-wide">Prime transazioni in arrivo non appena Stripe sarà attivo.</p>
            </div>
          )}
        </div>

        {/* Scholar Students */}
        <div>
          <h2 className="stencil-title text-black text-3xl mb-3">
            GLI STUDENTI FINANZIATI
          </h2>
          <p className="font-oswald text-gray-600 mb-8 text-lg leading-relaxed">
            Non sono numeri. Sono persone reali con nomi, storie e sogni.
            Ogni contributo ricevuto finanzia direttamente uno di loro.
            Questo è il cuore di tutto.
          </p>

          {scholars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scholars.map((student) => (
                <div key={student.id} className="glass p-6">
                  <div className="flex gap-4 mb-4">
                    {student.photo_url ? (
                      <img src={student.photo_url} alt="" className="w-16 h-16 object-cover border-3 border-black" />
                    ) : (
                      <div className="w-16 h-16 border-3 border-black flex items-center justify-center text-2xl bg-gray-100">👤</div>
                    )}
                    <div>
                      <h3 className="stencil-title text-black text-xl">{student.name}</h3>
                      <p className="font-oswald text-gray-600 text-sm uppercase tracking-wide">{student.age} anni — {student.country}</p>
                      <p className="font-oswald text-gray-500 text-xs">{student.university} · {student.field_of_study}</p>
                    </div>
                  </div>
                  <p className="manifesto-text text-gray-700 text-sm leading-relaxed mb-3">"{student.story}"</p>
                  <p className="font-oswald text-black text-sm font-bold">Sogno: {student.dream}</p>
                  <div className="mt-4 flex items-center justify-between border-t-2 border-black pt-4">
                    <div className="font-oswald text-gray-500 text-xs uppercase tracking-wide">Borsa mensile</div>
                    <div className="stencil-title text-black text-xl">{fmt(student.monthly_grant)}/mese</div>
                  </div>
                  <button className="mt-4 w-full btn-yellow py-2 text-base">
                    ✉️ SCRIVI A {student.name.split(' ')[0].toUpperCase()}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 glass">
              <div className="stencil-title text-5xl mb-4">🎓</div>
              <p className="stencil-title text-black text-2xl mb-2">Primo studente in selezione.</p>
              <p className="font-oswald text-gray-600 max-w-md mx-auto leading-relaxed">
                Le borse di studio vengono assegnate non appena raggiungiamo il primo obiettivo di finanziamento.
                Ogni passaporto ci avvicina.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
