import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/assets/styles/globals.css'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'
import { BASE_URL } from '@/config/siteConfig'
import { Providers } from '@/providers'

export const metadata: Metadata = {
  title: {
    default: 'Seazone',
    template: `%s | Seazone`,
  },
  metadataBase: new URL(BASE_URL),
  description: 'Seazone é uma plataforma de reservas de hospedagem online.',
  keywords: ['Seazone', 'Reservas', 'Hospedagem', '', 'Pará', 'Front-End'],
  authors: [
    { name: 'Aridan Pantoja', url: 'https://github.com/aridanpantoja' },
  ],
  creator: 'Aridan Pantoja',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: BASE_URL,
    title: 'Seazone',
    description: 'Seazone é uma plataforma de reservas de hospedagem online.',
    siteName: 'Seazone',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Seazone',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seazone',
    description: 'Seazone é uma plataforma de reservas de hospedagem online.',
    images: [`${BASE_URL}/og-image.png`],
    creator: '@Iracema_ema',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${BASE_URL}/site.webmanifest`,
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn('bg-background antialiased', inter.className)}>
        <Providers>
          <div className="flex h-full min-h-screen flex-col">
            <Navbar />
            <div className="h-full flex-1">{children}</div>
            <Footer />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  )
}
