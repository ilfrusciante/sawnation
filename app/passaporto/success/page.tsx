'use client'

import { Suspense } from 'react'
import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Citizen } from '@/lib/supabase'

function SuccessContent() {
  const params = useSearchParams()
  const sessionId = params.get('session_id')
  const isDemo = params.get('demo') === 'true'
  const demoName = params.get('name') ?? ''
  const demoCountry = params.get('country') ?? ''

  const [citizen, setCitizen] = useState<Citizen | null>(null)
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (isDemo) {
      // Modalità demo — mostra passaporto senza pagamento
      setCitizen({
        id: 'demo',
        citizen_number: Math.floor(Math.random() * 9999) + 1,
        name: demoName,
        country: demoCountry,
        country_code: 'XX',
        stripe_payment_id: 'demo',
        passport_issued_at: new Date().toISOString(),
      })
      setLoading(false)
      return
    }

    if (!sessionId) { setLoading(false); return }

    let attempts = 0
    const poll = setInterval(async () => {
      const { data } = await supabase
        .from('citizens')
        .select('*')
        .eq('stripe_payment_id', sessionId)
        .single()

      if (data || attempts > 10) {
        setCitizen(data)
        setLoading(false)
        clearInterval(poll)
      }
      attempts++
    }, 1500)

    return () => clearInterval(poll)
  }, [sessionId, isDemo, demoName, demoCountry])

  const downloadPassport = () => {
    if (!citizen) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    canvas.width = 1080
    canvas.height = 680

    // Background carta
    ctx.fillStyle = '#F5F0E8'
    ctx.fillRect(0, 0, 1080, 680)

    // Border
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 12
    ctx.strokeRect(6, 6, 1068, 668)

    // Red stripe top
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(0, 0, 1080, 80)

    // Title
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 48px Arial Black'
    ctx.fillText('✊ SAWNation', 40, 58)

    ctx.fillStyle = '#000'
    ctx.font = 'bold 72px Arial Black'
    ctx.fillText(citizen.name, 40, 200)

    ctx.font = '32px Arial'
    ctx.fillStyle = '#333'
    ctx.fillText(citizen.country, 40, 250)

    // Number
    ctx.fillStyle = '#FF0000'
    ctx.font = 'bold 96px Arial Black'
    ctx.fillText(`#${String(citizen.citizen_number).padStart(6, '0')}`, 40, 420)

    ctx.fillStyle = '#666'
    ctx.font = 'bold 20px Arial'
    ctx.fillText('NUMERO CITTADINO', 40, 455)

    // Yellow stripe
    ctx.fillStyle = '#FFD700'
    ctx.fillRect(0, 580, 1080, 100)
    ctx.fillStyle = '#000'
    ctx.font = 'bold 22px Arial'
    ctx.fillText('"Nato in ' + citizen.country + '. Cittadino del mondo. Nessuna guerra dichiarata da sempre."', 30, 640)

    const link = document.createElement('a')
    link.download = `SAWNation_Passaporto_${citizen.name.replace(/\s+/g, '_')}.png`
    link.href = canvas.toDataURL('image/png', 1.0)
    link.click()
  }

  if (loading) {
    return (
      <div className="text-center">
        <div className="stencil-title text-8xl mb-6">✊</div>
        <h1 className="stencil-title text-4xl text-white mb-4">Generazione passaporto...</h1>
        <p className="manifesto-text text-gray-400">Stiamo preparando il tuo documento.</p>
      </div>
    )
  }

  if (!citizen) {
    return (
      <div className="text-center max-w-md mx-auto">
        <div className="stencil-title text-6xl mb-6">✅</div>
        <h1 className="stencil-title text-4xl text-white mb-4">Pagamento ricevuto!</h1>
        <p className="manifesto-text text-gray-400 mb-8">Il tuo passaporto è in generazione.</p>
        <Link href="/" className="btn-protest px-8 py-4 inline-block">TORNA ALLA HOMEPAGE</Link>
      </div>
    )
  }

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="stencil-title text-6xl mb-4">✊</div>
      <h1 className="stencil-title text-4xl md:text-5xl text-white mb-4">
        BENVENUTO NELLA NAZIONE!
      </h1>
      <p className="manifesto-text text-gray-300 text-lg mb-10">
        Sei il cittadino numero{' '}
        <span className="stencil-title text-saw-red text-3xl">
          #{String(citizen.citizen_number).padStart(6, '0')}
        </span>
        {' '}della nazione che non ha mai dichiarato guerra.
      </p>

      {/* Passport Card */}
      <div className="citizen-card p-8 mb-8 max-w-sm mx-auto text-left">
        <div className="bg-saw-red text-white font-oswald font-bold text-xs uppercase tracking-widest px-3 py-1 inline-block mb-4">
          SAWNation
        </div>
        <div className="stencil-title text-2xl text-black mb-1">{citizen.name}</div>
        <div className="font-oswald text-gray-600 mb-4">{citizen.country}</div>
        <div className="border-t-4 border-black pt-4">
          <div className="font-oswald text-xs uppercase tracking-wider text-gray-500 mb-1">NUMERO CITTADINO</div>
          <div className="stencil-title text-4xl text-saw-red">
            #{String(citizen.citizen_number).padStart(6, '0')}
          </div>
        </div>
        <div className="mt-4 bg-saw-yellow p-3 text-xs font-oswald text-black">
          "Nato in {citizen.country}. Cittadino del mondo. Nessuna guerra dichiarata da sempre."
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={downloadPassport} className="btn-protest px-8 py-4 text-lg">
          📥 SCARICA PDF
        </button>
        <Link href="/" className="btn-yellow px-8 py-4 text-lg inline-block">
          🌍 HOMEPAGE
        </Link>
      </div>

      <p className="manifesto-text text-gray-600 text-sm mt-8">
        Condividi con #SAWNation 🕊️
      </p>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4 flex items-center justify-center">
      <Suspense fallback={
        <div className="text-center text-white stencil-title text-4xl">Caricamento...</div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
