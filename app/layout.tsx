import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NEX4 - A Premium Web4 intelligence, AI trading, limitless speed',
  description: 'NEX4 brings raw real-time Solana data, a browser-based CLI, and developer-ready tools — all in one seamless Web4 platform',
  generator: 'Next.js',
  metadataBase: new URL('https://nex4.dev'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/IMG_8326.PNG', sizes: '16x16' },
      { url: '/IMG_8326.PNG', sizes: '32x32' },
      { url: '/IMG_8326.PNG', sizes: '64x64' },
      { url: '/IMG_8326.PNG', sizes: '192x192' },
      { url: '/IMG_8326.PNG', sizes: '512x512' },
    ],
    apple: [
      { url: '/IMG_8326.PNG', sizes: '57x57' },
      { url: '/IMG_8326.PNG', sizes: '60x60' },
      { url: '/IMG_8326.PNG', sizes: '72x72' },
      { url: '/IMG_8326.PNG', sizes: '76x76' },
      { url: '/IMG_8326.PNG', sizes: '114x114' },
      { url: '/IMG_8326.PNG', sizes: '120x120' },
      { url: '/IMG_8326.PNG', sizes: '144x144' },
      { url: '/IMG_8326.PNG', sizes: '152x152' },
      { url: '/IMG_8326.PNG', sizes: '180x180' },
    ],
    shortcut: '/IMG_8326.PNG',
  },
  openGraph: {
    title: 'NEX4 - A Premium Web4 intelligence, AI trading, limitless speed',
    description: 'NEX4 brings raw real-time Solana data, a browser-based CLI, and developer-ready tools — all in one seamless Web4 platform',
    images: [{ url: '/IMG_8326.PNG', width: 1500, height: 1500, alt: 'NEX4 Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEX4 - A Premium Web4 intelligence, AI trading, limitless speed',
    description: 'NEX4 brings raw real-time Solana data, a browser-based CLI, and developer-ready tools — all in one seamless Web4 platform',
    images: ['/IMG_8326.PNG'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
