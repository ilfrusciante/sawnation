'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { MemeChallenge, MemeSubmission } from '@/lib/supabase'

export default function MemePage() {
  const [challenge, setChallenge] = useState<MemeChallenge | null>(null)
  const [submissions, setSubmissions] = useState<MemeSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [daysLeft, setDaysLeft] = useState(7)

  useEffect(() => {
    const fetchData = async () => {
      const { data: challengeData } = await supabase
        .from('meme_challenges')
        .select('*')
        .eq('is_active', true)
        .single()

      if (challengeData) {
        setChallenge(challengeData)
        const end = new Date(challengeData.week_start)
        end.setDate(end.getDate() + 7)
        const diff = Math.max(0, Math.ceil((end.getTime() - Date.now()) / 86400000))
        setDaysLeft(diff)

        const { data: subs } = await supabase
          .from('meme_submissions')
          .select('*')
          .eq('challenge_id', challengeData.id)
          .order('votes', { ascending: false })
          .limit(20)

        setSubmissions(subs ?? [])
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleVote = async (submissionId: string) => {
    await supabase.rpc('vote_meme', { submission_id: submissionId })
    setSubmissions(prev =>
      prev.map(s => s.id === submissionId ? { ...s, votes: s.votes + 1 } : s)
        .sort((a, b) => b.votes - a.votes)
    )
  }

  return (
    <div className="min-h-screen bg-white pt-16">

      {/* HERO */}
      <section className="bg-saw-yellow border-b-4 border-black px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <p className="font-oswald text-xs uppercase tracking-widest text-black/60 mb-3">— Resistenza creativa</p>
          <h1 className="stencil-title text-black text-5xl md:text-7xl leading-none mb-4">
            UN MEME<br />VI SOTTERRERÀ
          </h1>
          <p className="font-oswald text-black text-lg max-w-2xl leading-relaxed mb-4">
            Sfida settimanale su un tema politico reale. La community vota.
            Il meme vincitore viene inviato ufficialmente all'ufficio stampa del capo di stato coinvolto.
            Perché la satira è seria.
          </p>
          <p className="font-oswald text-black/60 text-sm border-l-4 border-black pl-4">
            I meme sono satira creativa degli utenti — non dichiarazioni ufficiali di SAWNation.
            L'umorismo è l'ultima difesa di chi non ha eserciti.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {loading ? (
          <div className="text-center py-20 border-3 border-black">
            <p className="stencil-title text-black text-2xl">Caricamento sfida in corso...</p>
          </div>
        ) : challenge ? (
          <>
            {/* Active Challenge */}
            <div className="bg-black thick-border p-8 mb-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="font-oswald text-gray-400 text-xs uppercase tracking-widest mb-2">Sfida della settimana</div>
                  <h2 className="stencil-title text-white text-3xl md:text-4xl">{challenge.theme}</h2>
                  <p className="font-oswald text-gray-300 mt-2 leading-relaxed">{challenge.description}</p>
                </div>
                <div className="text-center bg-saw-yellow thick-border p-6">
                  <div className="stencil-title text-black text-5xl">{daysLeft}</div>
                  <div className="font-oswald text-black text-sm uppercase font-bold">giorni rimasti</div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="btn-yellow px-6 py-3 text-base">
                  📤 PARTECIPA — CARICA IL TUO MEME
                </button>
                <div className="bg-white thick-border font-oswald font-bold px-6 py-3 text-sm flex items-center gap-2 text-black">
                  <div className="pulse-dot" />
                  {submissions.length} meme in gara
                </div>
              </div>
            </div>

            {/* Submissions */}
            {submissions.length > 0 ? (
              <div>
                <h2 className="stencil-title text-black text-3xl mb-6">
                  🏆 CLASSIFICA — VOTA IL MIGLIORE
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {submissions.map((sub, index) => (
                    <div key={sub.id} className={`glass overflow-hidden ${sub.is_winner ? 'border-saw-yellow' : ''}`}>
                      {sub.is_winner && (
                        <div className="bg-saw-yellow border-b-3 border-black px-4 py-2 font-oswald font-bold text-sm text-center text-black uppercase tracking-wide">
                          🏆 Meme Ufficiale della Settimana
                        </div>
                      )}
                      {index === 0 && !sub.is_winner && (
                        <div className="bg-saw-red border-b-3 border-black px-4 py-2 font-oswald font-bold text-sm text-center text-white uppercase tracking-wide">
                          🔥 In testa
                        </div>
                      )}
                      <div className="p-4">
                        <div className="bg-gray-100 border-3 border-black aspect-square flex items-center justify-center mb-4 text-6xl">
                          {sub.image_url ? (
                            <img src={sub.image_url} alt="meme" className="w-full h-full object-contain" />
                          ) : '🖼️'}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="font-oswald text-gray-600 text-sm uppercase tracking-wide">#{index + 1} in classifica</div>
                          <button
                            onClick={() => handleVote(sub.id)}
                            className="btn-protest px-4 py-2 text-base flex items-center gap-2"
                          >
                            👊 {sub.votes}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 glass">
                <div className="stencil-title text-5xl mb-4">🎨</div>
                <p className="stencil-title text-black text-2xl mb-6">Sii il primo questa settimana.</p>
                <button className="btn-protest px-8 py-4 text-xl">
                  CARICA IL TUO MEME →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 glass">
            <div className="stencil-title text-5xl mb-4">⏳</div>
            <p className="stencil-title text-black text-2xl">Prima sfida in arrivo.</p>
            <p className="font-oswald text-gray-600 mt-2">Diventa cittadino per partecipare quando apre.</p>
          </div>
        )}
      </div>
    </div>
  )
}
