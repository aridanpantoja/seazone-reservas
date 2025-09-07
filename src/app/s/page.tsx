import { PropertyReel } from '@/components/property-reel'
import { WidthWrapper } from '@/components/width-wrapper'
import { getProperties } from '@/services/properties'

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
    amenities?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const {
    cidade,
    estado,
    tipo,
    preco_min,
    preco_max,
    quartos,
    banheiros,
    hospedes,
    amenities,
  } = await searchParams

  const properties = await getProperties({
    city: cidade,
    state: estado,
    type: tipo,
    maxPrice: preco_max,
    minPrice: preco_min,
    bedrooms: quartos,
    guests: hospedes,
    amenities,
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
