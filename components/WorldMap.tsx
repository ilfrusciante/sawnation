'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase'

// Leaflet must be imported dynamically (SSR incompatible)
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false })
const CircleMarker = dynamic(() => import('react-leaflet').then(m => m.CircleMarker), { ssr: false })
const Tooltip = dynamic(() => import('react-leaflet').then(m => m.Tooltip), { ssr: false })

type CountryData = {
  country: string
  country_code: string
  lat: number
  lng: number
  count: number
}

// Fallback data while loading
const DEMO_DATA: CountryData[] = [
  { country: 'Italia', country_code: 'IT', lat: 41.9, lng: 12.5, count: 0 },
  { country: 'USA', country_code: 'US', lat: 37.09, lng: -95.71, count: 0 },
  { country: 'Germania', country_code: 'DE', lat: 51.16, lng: 10.45, count: 0 },
  { country: 'Francia', country_code: 'FR', lat: 46.2, lng: 2.2, count: 0 },
  { country: 'Brasile', country_code: 'BR', lat: -14.2, lng: -51.9, count: 0 },
  { country: 'India', country_code: 'IN', lat: 20.6, lng: 79.0, count: 0 },
  { country: 'Ucraina', country_code: 'UA', lat: 48.4, lng: 31.2, count: 0 },
  { country: 'Gaza', country_code: 'PS', lat: 31.5, lng: 34.5, count: 0 },
]

export default function WorldMap() {
  const [countries, setCountries] = useState<CountryData[]>(DEMO_DATA)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const fetchData = async () => {
      const { data } = await supabase
        .from('citizen_countries')
        .select('country, country_code, lat, lng, count')
        .order('count', { ascending: false })

      if (data && data.length > 0) {
        setCountries(data)
      }
    }
    fetchData()

    // Real-time subscription
    const channel = supabase
      .channel('world-map')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'citizens',
      }, () => { fetchData() })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-[400px] bg-gray-900/50 rounded-xl flex items-center justify-center">
        <div className="text-gray-500">Caricamento mappa...</div>
      </div>
    )
  }

  const maxCount = Math.max(...countries.map(c => c.count), 1)

  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-[#CC0000]/20">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%', background: '#111' }}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countries.map((country) => {
          const radius = Math.max(5, Math.min(30, (country.count / maxCount) * 30))
          return (
            <CircleMarker
              key={country.country_code}
              center={[country.lat, country.lng]}
              radius={radius}
              fillColor="#CC0000"
              fillOpacity={0.7}
              color="#FF0000"
              weight={1}
            >
              <Tooltip direction="top" permanent={false}>
                <div className="font-bold">{country.country}</div>
                <div className="text-[#CC0000]">{country.count.toLocaleString('it-IT')} cittadini</div>
              </Tooltip>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}
