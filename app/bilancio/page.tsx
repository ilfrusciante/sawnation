'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Transaction } from '@/lib/supabase'

type BudgetTotals = {
  total_in: number
  passports_today: number
  total_donations: number
}

export default function BilancioPage() {
  const [totals, setTotals] = useState<BudgetTotals>({
    total_in: 0, passports_today: 0, total_donations: 0,
  })
  const [transactions, setTransactions] = useState<Transaction[]>([])
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
        const totalDonations = txData.filter(t => t.type === 'donation').reduce((s, t) => s + t.amount, 0)
        const today = new Date().toDateString()
        const passportsToday = txData.filter(t =>
          t.type === 'passport' && new Date(t.created_at).toDateString() === today
        ).length
        setTotals({ total_in: totalIn, passports_today: passportsToday, total_donations: totalDonations })
      }
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
          total_donations: t.type === 'donation' ? prev.total_donations + t.amount : prev.total_donations,
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
      <section className="bg-black px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <p className="font-oswald text-xs uppercase tracking-widest text-gray-400 mb-3">— Trasparenza radicale</p>
          <h1 className="stencil-title text-white text-5xl md:text-7xl leading-none mb-4">
            IL BILANCIO<br />
            <span className="text-white">DELLA NAZIONE</span>
          </h1>
          <p className="font-oswald text-gray-300 text-lg max-w-2xl leading-relaxed mb-4">
            SAWNation pubblica ogni movimento economico in tempo reale, verificabile da chiunque.
            Non perché siamo obbligati — ma perché la fiducia si costruisce con i numeri, non con le parole.
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Totale entrate', value: fmt(totals.total_in), sub: 'da sempre', live: true, dark: false },
            { label: 'Nuovi cittadini oggi', value: totals.passports_today.toString(), sub: 'registrazioni giornaliere', live: true, dark: true },
            { label: 'Donazioni volontarie', value: fmt(totals.total_donations), sub: 'contributi liberi', live: false, dark: false },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.dark ? 'bg-black' : 'bg-white'} glass p-6 text-center`}>
              {stat.live && (
                <div className="flex items-center justify-center gap-1 mb-2">
                  <div className="pulse-dot" />
                  <span className={`font-oswald text-xs font-bold uppercase ${stat.dark ? 'text-white' : 'text-black'}`}>LIVE</span>
                </div>
              )}
              <div className={`stencil-title text-3xl tabular-nums ${stat.dark ? 'text-white' : 'text-black'}`}>
                {loading ? '...' : stat.value}
              </div>
              <div className={`font-oswald text-xs mt-1 uppercase tracking-wide ${stat.dark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
              <div className={`font-oswald text-xs ${stat.dark ? 'text-gray-600' : 'text-gray-400'}`}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Come funziona */}
        <div className="glass p-8 mb-10">
          <h2 className="stencil-title text-black text-2xl mb-6">COME FUNZIONANO I FONDI</h2>
          <p className="font-oswald text-gray-600 text-sm mb-6 leading-relaxed">
            SAWNation non dipende da governi, non ha finanziatori privati e non vende pubblicità.
            Le entrate provengono esclusivamente da donazioni volontarie, sponsorizzazioni di atenei
            e proventi degli eventi. Ogni euro è destinato a mantenere la piattaforma attiva
            e a far crescere i progetti del movimento.
          </p>
          <div className="space-y-3">
            {[
              { source: 'Donazioni volontarie', desc: 'Contributi liberi da cittadini e sostenitori. Nessun obbligo, nessuna pressione.' },
              { source: 'Sponsorizzazioni universitarie', desc: 'Accordi con atenei che condividono i valori di SAWNation. Trasparenti e pubblicati.' },
              { source: 'Proventi dagli eventi', desc: 'Entrate generate dagli eventi pubblici organizzati dalla community globale.' },
            ].map((item) => (
              <div key={item.source} className="flex items-start gap-4 border-2 border-black p-4">
                <div className="flex-1">
                  <div className="font-oswald font-bold text-black text-sm uppercase tracking-wide mb-1">{item.source}</div>
                  <div className="font-oswald text-gray-600 text-xs">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="glass p-8">
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
                  <div className="stencil-title text-black text-lg">{fmt(tx.amount)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-black">
              <p className="font-oswald text-gray-500 uppercase tracking-wide">Le prime transazioni appariranno qui non appena il sistema sarà operativo.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
