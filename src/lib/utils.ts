import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function generateGoogleMapsUrl(address: {
  city?: string
  state?: string
}) {
  const query = encodeURIComponent(
    `${address.city || ''} - ${address.state || ''}`,
  )

  return `https://www.google.com/maps?q=${query}&output=embed`
}
