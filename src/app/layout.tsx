import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/assets/styles/globals.css'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Seazone Reservas',
  description: 'Seazone Reservas',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn('bg-background antialiased', inter.className)}>
        {children}
      </body>
    </html>
  )
}
