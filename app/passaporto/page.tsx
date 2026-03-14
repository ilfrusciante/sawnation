'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

type FormData = {
  name: string
  country: string
  countryCode: string
  university: string
  photo: File | null
}

const COUNTRIES = [
  { name: 'Afghanistan', code: 'AF' }, { name: 'Albania', code: 'AL' },
  { name: 'Algeria', code: 'DZ' }, { name: 'Argentina', code: 'AR' },
  { name: 'Australia', code: 'AU' }, { name: 'Austria', code: 'AT' },
  { name: 'Belgio', code: 'BE' }, { name: 'Brasile', code: 'BR' },
  { name: 'Canada', code: 'CA' }, { name: 'Cile', code: 'CL' },
  { name: 'Cina', code: 'CN' }, { name: 'Colombia', code: 'CO' },
  { name: 'Egitto', code: 'EG' }, { name: 'Etiopia', code: 'ET' },
  { name: 'Francia', code: 'FR' }, { name: 'Germania', code: 'DE' },
  { name: 'Ghana', code: 'GH' }, { name: 'Grecia', code: 'GR' },
  { name: 'India', code: 'IN' }, { name: 'Iran', code: 'IR' },
  { name: 'Iraq', code: 'IQ' }, { name: 'Irlanda', code: 'IE' },
  { name: 'Israele', code: 'IL' }, { name: 'Italia', code: 'IT' },
  { name: 'Kenya', code: 'KE' }, { name: 'Libano', code: 'LB' },
  { name: 'Libia', code: 'LY' }, { name: 'Messico', code: 'MX' },
  { name: 'Nigeria', code: 'NG' }, { name: 'Olanda', code: 'NL' },
  { name: 'Pakistan', code: 'PK' }, { name: 'Palestina', code: 'PS' },
  { name: 'Polonia', code: 'PL' }, { name: 'Portogallo', code: 'PT' },
  { name: 'Regno Unito', code: 'GB' }, { name: 'Romania', code: 'RO' },
  { name: 'Russia', code: 'RU' }, { name: 'Siria', code: 'SY' },
  { name: 'Somalia', code: 'SO' }, { name: 'Spagna', code: 'ES' },
  { name: 'Sudan', code: 'SD' }, { name: 'Svezia', code: 'SE' },
  { name: 'Turchia', code: 'TR' }, { name: 'Ucraina', code: 'UA' },
  { name: 'USA', code: 'US' }, { name: 'Venezuela', code: 'VE' },
  { name: 'Yemen', code: 'YE' },
]

export default function PassaportoPage() {
  const [step, setStep] = useState<'form' | 'preview' | 'payment' | 'success'>('form')
  const [form, setForm] = useState<FormData>({ name: '', country: 'Italia', countryCode: 'IT', university: '', photo: null })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [citizenNumber, setCitizenNumber] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setForm(f => ({ ...f, photo: file }))
      const reader = new FileReader()
      reader.onloadend = () => setPhotoPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = COUNTRIES.find(c => c.name === e.target.value)
    setForm(f => ({ ...f, country: e.target.value, countryCode: selected?.code ?? '' }))
  }

  const getNextCitizenNumber = async () => {
    const { count } = await supabase
      .from('citizens')
      .select('*', { count: 'exact', head: true })
    return (count ?? 0) + 1
  }

  const handlePreview = async () => {
    if (!form.name || !form.country) return
    setLoading(true)
    const num = await getNextCitizenNumber()
    setCitizenNumber(num)
    setStep('preview')
    setLoading(false)
  }

  const handlePayment = () => {
    // Redirect to Stripe Checkout (API route)
    window.location.href = `/api/checkout?name=${encodeURIComponent(form.name)}&country=${encodeURIComponent(form.country)}&country_code=${form.countryCode}&university=${encodeURIComponent(form.university)}`
  }

  const downloadPassport = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `SAWNation_Passaporto_${form.name.replace(' ', '_')}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🛂</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Il Passaporto SAWNation
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            La tua carta d'identità digitale. Unica. Con numero progressivo.
            Il tuo posto nella storia di una nazione che non ha mai dichiarato guerra.
          </p>
          <div className="mt-4 inline-block bg-[#CC0000]/10 border border-[#CC0000]/30 rounded-full px-6 py-2">
            <span className="text-[#CC0000] font-black text-xl">Solo 2€</span>
            <span className="text-gray-400 ml-2 text-sm">— una tantum. 80% va agli studenti in guerra.</span>
          </div>
        </div>

        {step === 'form' && (
          <div className="glass rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-black text-white mb-8">Crea il tuo passaporto</h2>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Nome completo *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Es. Marco Rossi"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#CC0000] rounded-xl px-4 py-3 text-white outline-none transition-colors placeholder-gray-600"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Paese di origine *</label>
                <select
                  value={form.country}
                  onChange={handleCountryChange}
                  className="w-full bg-gray-900 border border-white/10 focus:border-[#CC0000] rounded-xl px-4 py-3 text-white outline-none transition-colors"
                >
                  {COUNTRIES.map(c => (
                    <option key={c.code} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* University */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Università (opzionale)</label>
                <input
                  type="text"
                  value={form.university}
                  onChange={e => setForm(f => ({ ...f, university: e.target.value }))}
                  placeholder="Es. Università La Sapienza"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#CC0000] rounded-xl px-4 py-3 text-white outline-none transition-colors placeholder-gray-600"
                />
              </div>

              {/* Photo */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Foto (opzionale)</label>
                <div
                  className="border-2 border-dashed border-white/10 hover:border-[#CC0000]/50 rounded-xl p-8 text-center cursor-pointer transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-24 h-24 rounded-full object-cover mx-auto" />
                  ) : (
                    <>
                      <div className="text-4xl mb-2">📸</div>
                      <p className="text-gray-400 text-sm">Clicca per caricare la tua foto</p>
                    </>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </div>

              <button
                onClick={handlePreview}
                disabled={!form.name || loading}
                className="w-full bg-[#CC0000] hover:bg-[#990000] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xl py-5 rounded-xl transition-all hover:scale-[1.02]"
              >
                {loading ? 'Generazione...' : 'Anteprima del mio passaporto →'}
              </button>
            </div>
          </div>
        )}

        {step === 'preview' && citizenNumber !== null && (
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-black text-white mb-6 text-center">Il tuo passaporto SAWNation</h2>

              {/* Passport Card */}
              <div className="max-w-sm mx-auto">
                <div className="citizen-card rounded-2xl p-6 shadow-2xl shadow-[#CC0000]/10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">SAWNation</div>
                      <div className="text-xs text-gray-500">Students Against War Nation</div>
                    </div>
                    <div className="text-3xl">✊</div>
                  </div>

                  <div className="flex gap-4 mb-6">
                    {photoPreview ? (
                      <img src={photoPreview} alt="" className="w-20 h-20 rounded-xl object-cover border-2 border-[#CC0000]/50" />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-[#CC0000]/10 border-2 border-[#CC0000]/30 flex items-center justify-center text-3xl">
                        👤
                      </div>
                    )}
                    <div>
                      <div className="text-white font-black text-lg leading-tight">{form.name}</div>
                      <div className="text-gray-400 text-sm mt-1">{form.country}</div>
                      {form.university && <div className="text-gray-500 text-xs mt-1">{form.university}</div>}
                    </div>
                  </div>

                  <div className="border-t border-[#CC0000]/20 pt-4">
                    <div className="text-xs text-gray-500 mb-1">NUMERO CITTADINO</div>
                    <div className="text-[#CC0000] font-black text-2xl">#{String(citizenNumber).padStart(6, '0')}</div>
                  </div>

                  <div className="mt-4 text-xs text-gray-500 italic leading-relaxed">
                    "Nato in {form.country}. Cittadino del mondo.<br />
                    Numero {citizenNumber} della nazione che non ha mai dichiarato guerra."
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 text-center">
              <p className="text-gray-400 mb-2 text-sm">
                Pagamento sicuro via Stripe. <span className="text-[#CC0000] font-bold">80% (1,60€) va direttamente agli studenti in guerra.</span>
              </p>
              <button
                onClick={handlePayment}
                className="w-full bg-[#CC0000] hover:bg-[#990000] text-white font-black text-xl py-5 rounded-xl transition-all hover:scale-[1.02] mt-2"
              >
                Paga 2€ e ottieni il tuo passaporto →
              </button>
              <button
                onClick={() => setStep('form')}
                className="mt-3 text-gray-500 hover:text-white text-sm transition-colors"
              >
                ← Torna indietro
              </button>
            </div>
          </div>
        )}

        {/* Info box */}
        {step === 'form' && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '🔒', title: 'Dati protetti', desc: 'I tuoi dati non vengono mai venduti. Articolo 4 della Costituzione.' },
              { icon: '📥', title: 'Download immediato', desc: 'PDF ad alta risoluzione scaricabile subito dopo il pagamento.' },
              { icon: '📱', title: 'Condivisibile', desc: 'Pronto per Instagram, Twitter, LinkedIn in un tap.' },
            ].map((item) => (
              <div key={item.title} className="glass rounded-xl p-5 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                <div className="text-gray-500 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
