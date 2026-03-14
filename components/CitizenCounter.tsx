'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface CitizenCounterProps {
  large?: boolean
}

export default function CitizenCounter({ large = false }: CitizenCounterProps) {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch initial count
    const fetchCount = async () => {
      const { count: total } = await supabase
        .from('citizens')
        .select('*', { count: 'exact', head: true })
      setCount(total ?? 0)
      setLoading(false)
    }
    fetchCount()

    // Subscribe to real-time updates
    const channel = supabase
      .channel('citizen-count')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'citizens',
      }, () => {
        setCount(prev => prev + 1)
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const formatted = count.toLocaleString('it-IT')

  if (large) {
    return (
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="pulse-dot" />
          <span className="text-xs font-bold text-[#CC0000] uppercase tracking-widest">Live</span>
        </div>
        <div className="text-7xl md:text-9xl font-black text-white tabular-nums">
          {loading ? '---' : formatted}
        </div>
        <p className="text-gray-400 text-lg mt-2 font-medium">
          cittadini della nazione che non ha mai dichiarato guerra
        </p>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="pulse-dot" />
      <span className="font-black text-white tabular-nums">{loading ? '...' : formatted}</span>
      <span className="text-gray-400 text-sm">cittadini</span>
    </div>
  )
}
