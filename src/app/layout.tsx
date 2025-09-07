import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/assets/styles/globals.css'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'

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
        <div className="flex h-full min-h-screen flex-col">
          <Navbar />
          <div className="h-full flex-1">{children}</div>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  )
}
