import { Button } from '@/components/ui/button'
import type { Metadata, ResolvingMetadata } from 'next'
import { Share } from 'next/font/google'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { WidthWrapper } from '../../../components/width-wrapper'
import { getProperties, getPropertyById } from '../../../services/properties'
import type { Property } from '../../../type/property.type'
import { Heart, Share2 } from 'lucide-react'
import { Gallery } from './_components/gallery'
import { ScheduleCard } from './_components/schedule-card'
import { Amenitie } from '@/components/amenitie'

type AccommodationPageProps = {
  params: Promise<{ id: number }>
}

export async function generateStaticParams() {
  const properties: Property[] = await getProperties()
  return properties.map((property) => ({
    id: property.id.toString(),
  }))
}

export default async function AccommodationPage({
  params,
}: AccommodationPageProps) {
  const { id } = await params
  const property = await getPropertyById(id)

  if (!property) {
    notFound()
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">{property.title}</h1>

        <div className="flex items-center justify-center gap-2">
          <Button variant="outline">
            <Share2 />
            Compartilhar
          </Button>
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
            <h2 className="text-xl font-bold">Comodidades</h2>

            <ul className="text-muted-foreground grid grid-cols-3 gap-6">
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

  return {
    title: property.title,
    openGraph: {
      images: [property.images[0], ...previousImages],
    },
  }
}
