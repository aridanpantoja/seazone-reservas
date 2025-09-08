export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export const siteConfig = {
  name: 'Seazone Reservas',
  description: 'Seazone é uma plataforma de reservas de hospedagem online.',
  url: BASE_URL,
} as const
