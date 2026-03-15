import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey)

export type Citizen = {
  id: string
  citizen_number: number
  name: string
  country: string
  country_code: string
  university?: string
  photo_url?: string
  passport_issued_at: string
  stripe_payment_id: string
}

export type Leader = {
  id: string
  name: string
  country: string
  age: number
  children_in_war: number
  war_decisions: number
  arms_sales_billion: number
  status: 'in_verifica' | 'verificato' | 'pubblicato'
  published_at?: string
  sources: { label: string; url: string }[]
  saw_citizens_in_country?: number
}

export type MemeChallenge = {
  id: string
  week_start: string
  theme: string
  description: string
  template_url: string
  is_active: boolean
}

export type MemeSubmission = {
  id: string
  challenge_id: string
  citizen_id: string
  image_url: string
  votes: number
  is_winner: boolean
  created_at: string
}

export type Spokesperson = {
  id: string
  citizen_id: string
  country: string
  week_start: string
  week_end: string
  message?: string
  is_active: boolean
  citizen?: Citizen
}

export type Transaction = {
  id: string
  type: 'passport' | 'sponsorship' | 'donation' | 'event'
  amount: number
  fund_students: number
  fund_platform: number
  stripe_id: string
  created_at: string
  description: string
}

export type ScholarStudent = {
  id: string
  name: string
  age: number
  country: string
  university: string
  field_of_study: string
  story: string
  dream: string
  photo_url?: string
  monthly_grant: number
  grant_start: string
  updates: { date: string; text: string }[]
}
