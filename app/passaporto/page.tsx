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

  const handleRegister = async () => {
    setLoading(true)
    try {
      let photoUrl: string | undefined
      if (form.photo) {
        const ext = form.photo.name.split('.').pop()
        const filename = `${Date.now()}.${ext}`
        const { data: uploadData } = await supabase.storage
          .from('passports')
          .upload(filename, form.photo)
        if (uploadData) {
          const { data: urlData } = supabase.storage.from('passports').getPublicUrl(filename)
          photoUrl = urlData.publicUrl
        }
      }
      const { data } = await supabase
        .from('citizens')
        .insert({
          citizen_number: citizenNumber,
          name: form.name,
          country: form.country,
          country_code: form.countryCode,
          university: form.university || null,
          photo_url: photoUrl || null,
          stripe_payment_id: 'free',
          passport_issued_at: new Date().toISOString(),
        })
        .select()
        .single()
      if (data) {
        window.location.href = `/passaporto/success?citizen_id=${data.id}`
      } else {
        window.location.href = `/passaporto/success?demo=true&name=${encodeURIComponent(form.name)}&country=${encodeURIComponent(form.country)}`
      }
    } catch {
      window.location.href = `/passaporto/success?demo=true&name=${encodeURIComponent(form.name)}&country=${encodeURIComponent(form.country)}`
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white pt-16">

      {/* HERO */}
      <section className="bg-black border-b-4 border-white px-6 py-14">
        <div className="max-w-3xl mx-auto">
          <p className="font-oswald text-xs uppercase tracking-widest text-gray-400 mb-3">— Documento di Cittadinanza</p>
          <h1 className="stencil-title text-white text-5xl md:text-7xl leading-none mb-4">
            IL PASSAPORTO<br /><span className="text-black">SAWNATION</span>
          </h1>
          <p className="font-oswald text-gray-300 text-lg max-w-xl leading-relaxed mb-2">
            Il tuo documento di identità digitale. Numero progressivo. Permanente.
            Il tuo posto registrato nella storia di una nazione che non ha mai dichiarato guerra.
          </p>
          <div className="mt-4 inline-block border-2 border-white text-white font-oswald font-bold text-sm px-4 py-2">
            Gratuito — una tantum. Per sempre.
          </div>
        </div>
      </section>

      {/* URBAN ART BANNER */}
      <section className="relative overflow-hidden h-40 md:h-52">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1524754271100-b16fa3ad4906?auto=format&fit=crop&w=1600&q=80"
          alt="Urban protest art"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12">

        {step === 'form' && (
          <div className="glass p-8 md:p-12">
            <h2 className="stencil-title text-black text-3xl mb-8">CREA IL TUO PASSAPORTO</h2>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block font-oswald text-sm font-bold text-black mb-2 uppercase tracking-wide">Nome completo *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Es. Marco Rossi"
                  className="w-full bg-white border-3 border-black focus:border-black px-4 py-3 text-black outline-none transition-colors placeholder-gray-400 font-oswald"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block font-oswald text-sm font-bold text-black mb-2 uppercase tracking-wide">Paese di origine *</label>
                <select
                  value={form.country}
                  onChange={handleCountryChange}
                  className="w-full bg-white border-3 border-black focus:border-black px-4 py-3 text-black outline-none transition-colors font-oswald"
                >
                  {COUNTRIES.map(c => (
                    <option key={c.code} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* University */}
              <div>
                <label className="block font-oswald text-sm font-bold text-black mb-2 uppercase tracking-wide">Università (opzionale)</label>
                <input
                  type="text"
                  value={form.university}
                  onChange={e => setForm(f => ({ ...f, university: e.target.value }))}
                  placeholder="Es. Università La Sapienza"
                  className="w-full bg-white border-3 border-black focus:border-black px-4 py-3 text-black outline-none transition-colors placeholder-gray-400 font-oswald"
                />
              </div>

              {/* Photo */}
              <div>
                <label className="block font-oswald text-sm font-bold text-black mb-2 uppercase tracking-wide">Foto (opzionale)</label>
                <div
                  className="border-3 border-dashed border-black hover:border-black p-8 text-center cursor-pointer transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-24 h-24 object-cover mx-auto border-3 border-black" />
                  ) : (
                    <>
                      <div className="text-4xl mb-2">📸</div>
                      <p className="font-oswald text-gray-500 text-sm uppercase tracking-wide">Clicca per caricare la tua foto</p>
                    </>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </div>

              <button
                onClick={handlePreview}
                disabled={!form.name || loading}
                className="w-full btn-protest py-5 text-2xl disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'GENERAZIONE IN CORSO...' : 'ANTEPRIMA DEL MIO PASSAPORTO →'}
              </button>
            </div>
          </div>
        )}

        {step === 'preview' && citizenNumber !== null && (
          <div className="space-y-8">
            <div className="glass p-8">
              <h2 className="stencil-title text-black text-3xl mb-6 text-center">IL TUO PASSAPORTO SAWNATION</h2>

              <div className="max-w-sm mx-auto">
                <div className="citizen-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="font-oswald text-xs text-gray-500 uppercase tracking-widest mb-1">SAWNation</div>
                      <div className="font-oswald text-xs text-gray-500">Students Against War Nation</div>
                    </div>
                    <div className="text-3xl">✊</div>
                  </div>

                  <div className="flex gap-4 mb-6">
                    {photoPreview ? (
                      <img src={photoPreview} alt="" className="w-20 h-20 object-cover border-3 border-black" />
                    ) : (
                      <div className="w-20 h-20 border-3 border-black flex items-center justify-center text-3xl bg-gray-100">
                        👤
                      </div>
                    )}
                    <div>
                      <div className="stencil-title text-black text-xl leading-tight">{form.name}</div>
                      <div className="font-oswald text-gray-600 text-sm mt-1">{form.country}</div>
                      {form.university && <div className="font-oswald text-gray-500 text-xs mt-1">{form.university}</div>}
                    </div>
                  </div>

                  <div className="border-t-3 border-black pt-4">
                    <div className="font-oswald text-xs text-gray-500 mb-1 uppercase tracking-wider">Numero Cittadino</div>
                    <div className="stencil-title text-black text-3xl">#{String(citizenNumber).padStart(6, '0')}</div>
                  </div>

                  <div className="mt-4 bg-black p-3 text-xs font-oswald text-white border-t-2 border-black leading-relaxed">
                    "Nato/a in {form.country}. Cittadino/a del mondo.
                    Numero {citizenNumber} della nazione che non ha mai dichiarato guerra."
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-6 text-center">
              <p className="font-oswald text-gray-600 mb-2 text-sm">
                Registrazione gratuita.{' '}
                <span className="text-black font-bold">Il passaporto è tuo per sempre.</span>
              </p>
              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full btn-protest py-5 text-2xl mt-3 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? 'REGISTRAZIONE IN CORSO...' : 'OTTIENI IL TUO PASSAPORTO — GRATIS →'}
              </button>
              <button
                onClick={() => setStep('form')}
                className="mt-4 font-oswald text-gray-500 hover:text-black text-sm transition-colors uppercase tracking-wide"
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
              { icon: '🔒', title: 'Dati protetti per sempre', desc: 'Art. 4 della Costituzione SAWNation: i tuoi dati non verranno mai venduti, condivisi o ceduti. Nessuna eccezione.' },
              { icon: '📥', title: 'Download immediato', desc: 'Documento PNG ad alta risoluzione scaricabile subito dopo la registrazione. Tuo per sempre.' },
              { icon: '📱', title: 'Pronto da condividere', desc: 'Formato ottimizzato per Instagram, X, LinkedIn. Mostra il tuo numero al mondo.' },
            ].map((item) => (
              <div key={item.title} className="glass p-5">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="stencil-title text-black text-lg mb-1">{item.title}</div>
                <div className="font-oswald text-gray-600 text-sm leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
