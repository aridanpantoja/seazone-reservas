import { PropertyReel } from '@/components/property-reel'
import { WidthWrapper } from '@/components/width-wrapper'
import { getProperties } from '@/services/properties'
import type { Metadata } from 'next'

type SearchPageProps = {
  searchParams: Promise<{
    cidade?: string
    estado?: string
    tipo?: string
    preco_min?: number
    preco_max?: number
    quartos?: number
    banheiros?: number
    hospedes?: number
    comodidades?: string
    disponivel?: boolean
  }>
}

export const metadata: Metadata = {
  title: 'Busca de acomodações',
  description: 'Busque por acomodações',
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const {
    cidade,
    estado,
    tipo,
    preco_min,
    preco_max,
    quartos,
    hospedes,
    comodidades,
    disponivel,
  } = await searchParams

  const properties = await getProperties({
    guests: hospedes,
    location: {
      city: cidade,
      state: estado,
    },
    type: tipo,
    maxPrice: preco_max,
    minPrice: preco_min,
    bedrooms: quartos,
    available: disponivel,
    amenities: comodidades,
  })

  return (
    <main className="py-10">
      <WidthWrapper>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">
            Encontre o lugar perfeito para você
          </h1>
          <p className="text-muted-foreground text-sm">
            {properties.length} resultados encontrados
          </p>

          <PropertyReel initialProperties={properties} />
        </div>
      </WidthWrapper>
    </main>
  )
}
