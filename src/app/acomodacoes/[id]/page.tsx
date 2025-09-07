import { Amenitie } from '@/components/amenitie'
import { ShareButton } from '@/components/share-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { getProperties, getPropertyById } from '../../../services/properties'
import type { Property } from '../../../types/property.type'
import { Gallery } from './_components/gallery'
import { ScheduleCard } from './_components/schedule-card'

type AccommodationPageProps = {
  params: Promise<{ id: number }>
  searchParams: Promise<{ checkin: string; checkout: string; hospedes: number }>
}

export async function generateStaticParams() {
  const properties: Property[] = await getProperties()
  return properties.map((property) => ({
    id: property.id.toString(),
  }))
}

export default async function AccommodationPage({
  params,
  searchParams,
}: AccommodationPageProps) {
  const { id } = await params
  const property = await getPropertyById(id)
  const { checkin, checkout, hospedes } = await searchParams

  if (!property) {
    notFound()
  }

  console.log(checkin, checkout, hospedes)

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-bold md:text-2xl">{property.title}</h1>

        <div className="flex items-center justify-center gap-2">
          <ShareButton />
        </div>
      </div>

      <Gallery property={property} />

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-2xl font-bold">
              {property.type} em {property.location.city},{' '}
              {property.location.state}
            </h2>

            <p className="text-muted-foreground">
              {property.maxGuests} hóspedes &bull; {property.bedrooms} quartos
              &bull; {property.bathrooms} banheiros
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Descrição</h2>

            <p className="text-muted-foreground">Adicionar descrição</p>
          </div>

          <div className="space-y-8">
            <h2 className="text-xl font-bold">Comodidades</h2>

            <ul className="text-muted-foreground grid grid-cols-2 gap-6 sm:grid-cols-3">
              {property.amenities.slice(0, 6).map((amenity) => (
                <li key={amenity} className="flex items-center gap-2">
                  <Amenitie
                    amenity={amenity}
                    iconClassName="size-6 text-2xl"
                    labelClassName="text-sm"
                    showLabel
                  />
                </li>
              ))}
            </ul>

            <Button
              variant="outline"
              className={cn(property.amenities.length <= 6 && 'hidden')}
            >
              Ver todas as comodidades
            </Button>
          </div>
        </div>

        <ScheduleCard {...property} />
      </div>
    </section>
  )
}

export async function generateMetadata(
  { params }: AccommodationPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params
  const property = await getPropertyById(id)

  const previousImages = (await parent).openGraph?.images || []

  if (!property) {
    return {
      title: 'Acomodação não encontrada',
    }
  }

  return {
    title: property.title,
    openGraph: {
      images: [property.images[0], ...previousImages],
    },
  }
}
