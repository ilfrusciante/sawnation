'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Citizen } from '@/lib/supabase'

export default function SuccessPage() {
  const params = useSearchParams()
  const sessionId = params.get('session_id')
  const [citizen, setCitizen] = useState<Citizen | null>(null)
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!sessionId) return

    // Poll for citizen creation (webhook might have slight delay)
    let attempts = 0
    const poll = setInterval(async () => {
      const { data } = await supabase
        .from('citizens')
        .select('*')
        .eq('stripe_payment_id', sessionId.replace('cs_', 'pi_'))
        .single()

      if (data || attempts > 10) {
        setCitizen(data)
        setLoading(false)
        clearInterval(poll)
      }
      attempts++
    }, 1500)

    return () => clearInterval(poll)
  }, [sessionId])

  const downloadPassport = async () => {
    if (!citizen) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    canvas.width = 1080
    canvas.height = 680

    // Background
    const grad = ctx.createLinearGradient(0, 0, 1080, 680)
    grad.addColorStop(0, '#1a0000')
    grad.addColorStop(1, '#0d0000')
    ctx.fillStyle = grad
    ctx.roundRect(0, 0, 1080, 680, 32)
    ctx.fill()

    // Red border
    ctx.strokeStyle = '#CC0000'
    ctx.lineWidth = 3
    ctx.roundRect(4, 4, 1072, 672, 30)
    ctx.stroke()

    // Title
    ctx.fillStyle = '#CC0000'
    ctx.font = 'bold 28px Inter, Arial'
    ctx.fillText('✊ SAWNation', 60, 70)

    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 18px Inter, Arial'
    ctx.fillText('Students Against War Nation', 60, 105)

    // Name
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 52px Inter, Arial'
    ctx.fillText(citizen.name, 60, 220)

    // Country
    ctx.fillStyle = '#999999'
    ctx.font = '28px Inter, Arial'
    ctx.fillText(citizen.country, 60, 270)

    // Citizen number
    ctx.fillStyle = '#CC0000'
    ctx.font = 'bold 42px Inter, Arial'
    ctx.fillText(`#${String(citizen.citizen_number).padStart(6, '0')}`, 60, 380)

    ctx.fillStyle = '#555555'
    ctx.font = '18px Inter, Arial'
    ctx.fillText('NUMERO CITTADINO', 60, 410)

    // Quote
    ctx.fillStyle = '#666666'
    ctx.font = 'italic 18px Inter, Arial'
    ctx.fillText(`"Nato in ${citizen.country}. Cittadino del mondo.`, 60, 500)
    ctx.fillText(`Numero ${citizen.citizen_number} della nazione che non ha mai dichiarato guerra."`, 60, 530)

    // Date
    ctx.fillStyle = '#333333'
    ctx.font = '16px Inter, Arial'
    ctx.fillText(`Emesso: ${new Date(citizen.passport_issued_at).toLocaleDateString('it-IT')}`, 60, 630)
    ctx.fillText('sawnation.org', 900, 630)

    const link = document.createElement('a')
    link.download = `SAWNation_Passaporto_${citizen.name.replace(/\s+/g, '_')}.png`
    link.href = canvas.toDataURL('image/png', 1.0)
    link.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">✊</div>
          <h1 className="text-3xl font-black text-white mb-4">Generazione passaporto...</h1>
          <p className="text-gray-400">Stiamo preparando il tuo documento.</p>
        </div>
      </div>
    )
  }

  if (!citizen) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-16 px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-black text-white mb-4">Pagamento ricevuto!</h1>
          <p className="text-gray-400 mb-8">Il tuo passaporto è in generazione. Riceverai una email a breve.</p>
          <Link href="/" className="bg-[#CC0000] text-white font-bold px-8 py-4 rounded-xl">Torna alla Homepage</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-6">✊</div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Benvenuto nella nazione!
        </h1>
        <p className="text-gray-400 text-lg mb-10">
          Sei il cittadino numero <span className="text-[#CC0000] font-black text-2xl">#{String(citizen.citizen_number).padStart(6, '0')}</span> della nazione che non ha mai dichiarato guerra.
        </p>

        {/* Passport Card */}
        <div className="citizen-card rounded-2xl p-8 mb-8 shadow-2xl shadow-[#CC0000]/10 mx-auto max-w-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">SAWNation</div>
              <div className="text-xs text-gray-500">Students Against War Nation</div>
            </div>
            <div className="text-3xl">✊</div>
          </div>
          <div className="mb-6">
            <div className="text-white font-black text-2xl">{citizen.name}</div>
            <div className="text-gray-400">{citizen.country}</div>
          </div>
          <div className="border-t border-[#CC0000]/20 pt-4">
            <div className="text-xs text-gray-500 mb-1">NUMERO CITTADINO</div>
            <div className="text-[#CC0000] font-black text-3xl">#{String(citizen.citizen_number).padStart(6, '0')}</div>
          </div>
          <div className="mt-4 text-xs text-gray-500 italic">
            "Nato in {citizen.country}. Cittadino del mondo.<br />
            Numero {citizen.citizen_number} della nazione che non ha mai dichiarato guerra."
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={downloadPassport}
            className="bg-[#CC0000] hover:bg-[#990000] text-white font-black px-8 py-4 rounded-xl transition-all hover:scale-105"
          >
            📥 Scarica PDF Alta Risoluzione
          </button>
          <Link
            href="/"
            className="border border-white/20 hover:border-[#CC0000]/50 text-white font-bold px-8 py-4 rounded-xl transition-all"
          >
            🌍 Vai alla Homepage
          </Link>
        </div>

        <p className="text-gray-600 text-sm mt-8">
          Condividi il tuo passaporto sui social con #SAWNation 🕊️
        </p>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
