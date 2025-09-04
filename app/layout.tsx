import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NEX4DEV - A Premium Web4 intelligence, AI trading, limitless speed',
  description: 'NEX4 brings raw real-time Solana data, a browser-based CLI, and developer-ready tools — all in one seamless Web4 platform',
  generator: 'Next.js',
  icons: {
    icon: '/IMG_8326.PNG',
    apple: '/IMG_8326.PNG',
  },
  openGraph: {
    title: 'NEX4DEV - A Premium Web4 intelligence, AI trading, limitless speed',
    description: 'NEX4 brings raw real-time Solana data, a browser-based CLI, and developer-ready tools — all in one seamless Web4 platform',
    images: [{ url: '/IMG_8326.PNG', width: 1200, height: 630, alt: 'NEX4DEV Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEX4DEV - A Premium Web4 intelligence, AI trading, limitless speed',
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
