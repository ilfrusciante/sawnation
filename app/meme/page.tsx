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
    <div className="min-h-screen bg-black pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">😂</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Un Meme Vi Sotterrerà
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sfida meme settimanale su un tema politico reale. La community vota.
            Il vincitore viene inviato ufficialmente all'ufficio stampa del capo di stato coinvolto.
          </p>
          <div className="mt-4 text-gray-500 text-xs">
            Nota: i meme sono satira creativa degli utenti — non dichiarazioni ufficiali di SAWNation.
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Caricamento sfida...</div>
        ) : challenge ? (
          <>
            {/* Active Challenge */}
            <div className="saw-gradient rounded-2xl p-8 mb-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-white/60 text-sm uppercase tracking-widest mb-2 font-bold">Sfida della settimana</div>
                  <h2 className="text-2xl md:text-3xl font-black text-white">{challenge.theme}</h2>
                  <p className="text-white/70 mt-2">{challenge.description}</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-black text-white">{daysLeft}</div>
                  <div className="text-white/60 text-sm">giorni rimasti</div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="bg-white text-[#CC0000] font-black px-6 py-3 rounded-xl hover:bg-gray-100 transition-all text-sm">
                  📤 Partecipa — Carica il tuo meme
                </button>
                <div className="bg-white/10 text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center gap-2">
                  <div className="pulse-dot" />
                  {submissions.length} meme in gara
                </div>
              </div>
            </div>

            {/* Submissions */}
            {submissions.length > 0 ? (
              <div>
                <h2 className="text-2xl font-black text-white mb-6">
                  🏆 Classifica — Vota il migliore
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {submissions.map((sub, index) => (
                    <div key={sub.id} className={`glass rounded-2xl overflow-hidden ${sub.is_winner ? 'border-yellow-400/50' : ''}`}>
                      {sub.is_winner && (
                        <div className="bg-yellow-400/10 border-b border-yellow-400/20 px-4 py-2 text-yellow-400 font-bold text-sm text-center">
                          🏆 Meme Ufficiale della Settimana
                        </div>
                      )}
                      {index === 0 && !sub.is_winner && (
                        <div className="bg-[#CC0000]/10 border-b border-[#CC0000]/20 px-4 py-2 text-[#CC0000] font-bold text-sm text-center">
                          🔥 In testa
                        </div>
                      )}
                      <div className="p-4">
                        <div className="bg-gray-900 rounded-xl aspect-square flex items-center justify-center mb-4 text-6xl">
                          {sub.image_url ? (
                            <img src={sub.image_url} alt="meme" className="w-full h-full object-contain rounded-xl" />
                          ) : '🖼️'}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-400 text-sm">#{index + 1} in classifica</div>
                          <button
                            onClick={() => handleVote(sub.id)}
                            className="flex items-center gap-2 bg-[#CC0000]/10 hover:bg-[#CC0000]/20 border border-[#CC0000]/30 text-[#CC0000] font-black px-4 py-2 rounded-xl transition-all text-sm"
                          >
                            👊 {sub.votes}
                          </button>
                        </div>
                        <div className="mt-3 text-xs text-gray-600 italic">
                          "SAWNation — Cittadini {submissions.length > 0 ? '...' : 'X'}. Nessuna guerra dichiarata da sempre. 🕊️"
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <div className="text-5xl mb-4">🎨</div>
                <p className="text-lg mb-6">Sii il primo a partecipare questa settimana!</p>
                <button className="bg-[#CC0000] hover:bg-[#990000] text-white font-black px-8 py-4 rounded-xl transition-all">
                  Carica il tuo meme →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">⏳</div>
            <p className="text-lg">Prima sfida in arrivo. Torna presto.</p>
          </div>
        )}
      </div>
    </div>
  )
}
