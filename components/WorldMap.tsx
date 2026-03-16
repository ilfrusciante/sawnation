'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase'

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false })
const CircleMarker = dynamic(() => import('react-leaflet').then(m => m.CircleMarker), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false })
const Tooltip = dynamic(() => import('react-leaflet').then(m => m.Tooltip), { ssr: false })

type CountryData = {
  country: string
  country_code: string
  lat: number
  lng: number
  count: number
}

type Ping = {
  id: string
  lat: number
  lng: number
}

const COUNTRY_COORDS: Record<string, [number, number]> = {
  AF: [33.9, 67.7], AL: [41.1, 20.2], DZ: [28.0, 1.7], AR: [-38.4, -63.6],
  AU: [-25.3, 133.8], AT: [47.5, 14.6], BE: [50.5, 4.5], BR: [-14.2, -51.9],
  CA: [56.1, -106.3], CL: [-35.7, -71.5], CN: [35.9, 104.2], CO: [4.1, -72.9],
  EG: [26.8, 30.8], ET: [9.1, 40.5], FR: [46.2, 2.2], DE: [51.2, 10.5],
  GH: [7.9, -1.0], GR: [39.1, 21.8], IN: [20.6, 79.0], IR: [32.4, 53.7],
  IQ: [33.2, 43.7], IE: [53.1, -8.2], IL: [31.0, 34.9], IT: [41.9, 12.5],
  KE: [-0.0, 37.9], LB: [33.9, 35.5], LY: [26.3, 17.2], MX: [23.6, -102.6],
  NG: [9.1, 8.7], NL: [52.1, 5.3], PK: [30.4, 69.3], PS: [31.9, 35.2],
  PL: [51.9, 19.1], PT: [39.4, -8.2], GB: [55.4, -3.4], RO: [45.9, 24.9],
  RU: [61.5, 105.3], SY: [34.8, 38.9], SO: [5.2, 46.2], ES: [40.5, -3.7],
  SD: [12.9, 30.2], SE: [60.1, 18.6], TR: [38.9, 35.2], UA: [48.4, 31.2],
  US: [37.1, -95.7], VE: [6.4, -66.6], YE: [15.6, 48.5],
}

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
  const [pings, setPings] = useState<Ping[]>([])
  const [isClient, setIsClient] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pingIconRef = useRef<any>(null)

  useEffect(() => {
    setIsClient(true)

    // Load leaflet and create ping icon
    import('leaflet').then((L) => {
      pingIconRef.current = L.divIcon({
        html: '<div class="map-ping-dot"></div>',
        iconSize: [60, 60],
        iconAnchor: [30, 30],
        className: '',
      })
    })

    const fetchData = async () => {
      const { data } = await supabase
        .from('citizen_countries')
        .select('country, country_code, lat, lng, count')
        .order('count', { ascending: false })
      if (data && data.length > 0) setCountries(data)
    }
    fetchData()

    const channel = supabase
      .channel('world-map')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'citizens',
      }, (payload) => {
        const countryCode = (payload.new as { country_code: string }).country_code
        const coords = COUNTRY_COORDS[countryCode]
        if (coords) {
          const pingId = `ping-${Date.now()}-${Math.random()}`
          setPings(prev => [...prev, { id: pingId, lat: coords[0], lng: coords[1] }])
          setTimeout(() => {
            setPings(prev => prev.filter(p => p.id !== pingId))
          }, 3500)
        }
        fetchData()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-[520px] bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 font-medium tracking-widest text-sm uppercase">Caricamento mappa...</p>
      </div>
    )
  }

  const maxCount = Math.max(...countries.map(c => c.count), 1)

  return (
    <div className="w-full h-[520px] overflow-hidden">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%', background: '#f5f5f0' }}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Existing citizen dots */}
        {countries.map((country) => {
          const radius = country.count > 0
            ? Math.max(5, Math.min(28, (country.count / maxCount) * 28))
            : 4
          return (
            <CircleMarker
              key={country.country_code}
              center={[country.lat, country.lng]}
              radius={radius}
              fillColor="#1a1a1a"
              fillOpacity={country.count > 0 ? 0.7 : 0.25}
              color="#1a1a1a"
              weight={1}
            >
              <Tooltip direction="top" permanent={false}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px' }}>
                  {country.country}
                </span>
                <br />
                <span style={{ fontFamily: 'Inter, sans-serif', color: '#666', fontSize: '12px' }}>
                  {country.count.toLocaleString('it-IT')} cittadini
                </span>
              </Tooltip>
            </CircleMarker>
          )
        })}

        {/* Live ping markers — appear on new registration */}
        {pingIconRef.current && pings.map((ping) => (
          <Marker
            key={ping.id}
            position={[ping.lat, ping.lng]}
            icon={pingIconRef.current}
          />
        ))}
      </MapContainer>
    </div>
  )
}
