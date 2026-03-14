import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature invalid' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { citizen_name, country, country_code, university } = session.metadata!
    const amount = (session.amount_total ?? 200) / 100

    // Get next citizen number
    const { count } = await supabaseAdmin
      .from('citizens')
      .select('*', { count: 'exact', head: true })
    const citizenNumber = (count ?? 0) + 1

    // Create citizen
    const { data: citizen, error: citizenError } = await supabaseAdmin
      .from('citizens')
      .insert({
        citizen_number: citizenNumber,
        name: citizen_name,
        country,
        country_code,
        university: university || null,
        stripe_payment_id: session.payment_intent as string,
        passport_issued_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (citizenError) {
      console.error('Error creating citizen:', citizenError)
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }

    // Record transaction
    await supabaseAdmin.from('transactions').insert({
      type: 'passport',
      amount,
      fund_students: amount * 0.8,
      fund_platform: amount * 0.2,
      stripe_id: session.payment_intent as string,
      description: `Passaporto #${String(citizenNumber).padStart(6, '0')} — ${citizen_name} (${country})`,
    })

    // Update country stats (for the map)
    await supabaseAdmin.rpc('upsert_citizen_country', {
      p_country: country,
      p_country_code: country_code,
    })
  }

  return NextResponse.json({ received: true })
}
