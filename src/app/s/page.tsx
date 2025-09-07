import { PropertyReel } from '@/components/property-reel'
import { WidthWrapper } from '@/components/width-wrapper'

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
  console.log(amenities, 'amenities')

  return (
    <main className="py-10">
      <WidthWrapper>
        <PropertyReel
          title={`Ache a acomodação perfeita para você`}
          filters={{
            location: {
              city: cidade,
              state: estado,
            },
            type: tipo,
            maxPrice: preco_max,
            minPrice: preco_min,
            bedrooms: quartos,
            guests: hospedes,
            amenities,
          }}
        />
      </WidthWrapper>
    </main>
  )
}
