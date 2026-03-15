import { NextRequest, NextResponse } from 'next/server'

// Stripe verrà attivato quando saranno disponibili le API keys
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name') ?? ''
  const country = searchParams.get('country') ?? ''

  if (!name || !country) {
    return NextResponse.json({ error: 'Nome e paese obbligatori' }, { status: 400 })
  }

  // TODO: integrare Stripe quando le keys saranno disponibili
  // Per ora redirect alla pagina di successo demo
  return NextResponse.redirect(
    new URL(`/passaporto/success?demo=true&name=${encodeURIComponent(name)}&country=${encodeURIComponent(country)}`, req.url)
  )
}
