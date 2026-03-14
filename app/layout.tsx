import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'SAWNation — Students Against War Nation',
  description: 'La prima nazione digitale fondata dagli studenti universitari di tutto il mondo. Nessuna guerra dichiarata da sempre. Nessun dato venduto. Mai.',
  keywords: 'studenti, pace, nazione digitale, contro la guerra, borse di studio',
  openGraph: {
    title: 'SAWNation ✊',
    description: 'I giovani del mondo hanno più in comune tra loro che con i governi che li rappresentano.',
    url: 'https://sawnation.org',
    siteName: 'SAWNation',
    images: [{ url: '/og-image.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAWNation ✊',
    description: 'La nazione che non ha mai dichiarato guerra.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className="bg-black text-white min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
