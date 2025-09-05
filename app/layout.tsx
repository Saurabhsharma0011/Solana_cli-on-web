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
      { url: '/Nnewlogo.png', sizes: '16x16' },
      { url: '/Nnewlogo.png', sizes: '32x32' },
      { url: '/Nnewlogo.png', sizes: '64x64' },
      { url: '/Nnewlogo.png', sizes: '192x192' },
      { url: '/Nnewlogo.png', sizes: '512x512' },
    ],
    apple: [
      { url: '/Nnewlogo.png', sizes: '57x57' },
      { url: '/Nnewlogo.png', sizes: '60x60' },
      { url: '/Nnewlogo.png', sizes: '72x72' },
      { url: '/Nnewlogo.png', sizes: '76x76' },
      { url: '/Nnewlogo.png', sizes: '114x114' },
      { url: '/Nnewlogo.png', sizes: '120x120' },
      { url: '/Nnewlogo.png', sizes: '144x144' },
      { url: '/Nnewlogo.png', sizes: '152x152' },
      { url: '/Nnewlogo.png', sizes: '180x180' },
    ],
    shortcut: '/Nnewlogo.png',
  },
  openGraph: {
    title: 'NEX4 - A Premium Web4 intelligence, AI trading, limitless speed',
    description: 'NEX4 brings raw real-time Solana data, a browser-based CLI, and developer-ready tools — all in one seamless Web4 platform',
    images: [{ url: '/Nnewlogo.png', width: 1500, height: 1500, alt: 'NEX4 Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEX4 - A Premium Web4 intelligence, AI trading, limitless speed',
    description: 'NEX4 brings raw real-time Solana data, a browser-based CLI, and developer-ready tools — all in one seamless Web4 platform',
    images: ['/Nnewlogo.png'],
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
