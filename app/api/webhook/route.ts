import { NextRequest, NextResponse } from 'next/server'

// Webhook Stripe — attivo quando le keys saranno configurate
export async function POST(req: NextRequest) {
  return NextResponse.json({ received: true })
}
