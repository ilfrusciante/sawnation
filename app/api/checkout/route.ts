import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name') ?? ''
  const country = searchParams.get('country') ?? ''
  const countryCode = searchParams.get('country_code') ?? ''
  const university = searchParams.get('university') ?? ''

  if (!name || !country) {
    return NextResponse.json({ error: 'Nome e paese obbligatori' }, { status: 400 })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Passaporto SAWNation',
            description: `Carta d'identità digitale di SAWNation per ${name} — Nato in ${country}. Cittadino del mondo.`,
            images: [`${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`],
          },
          unit_amount: 200, // 2€ in centesimi
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/passaporto/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/passaporto`,
    metadata: {
      citizen_name: name,
      country,
      country_code: countryCode,
      university,
    },
    custom_text: {
      submit: { message: '80% del tuo contributo va direttamente agli studenti in zone di guerra. 🕊️' },
    },
  })

  return NextResponse.redirect(session.url!)
}
