import { Amenity } from '@/components/amenity'
import { Gallery } from '@/components/gallery'
import { ShareButton } from '@/components/share-button'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatCurrency, generateGoogleMapsUrl } from '@/lib/utils'
import { getProperties, getPropertyById } from '@/services/properties'
import type { Property } from '@/types/property.type'
import { format } from 'date-fns'
import { Star } from 'lucide-react'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

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
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-bold md:text-2xl">{property.title}</h1>

        <div className="flex items-center justify-center gap-2">
          <ShareButton />
        </div>
      </div>

      <Gallery property={property} />

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold sm:text-xl">
                {property.type} em {property.location.city},{' '}
                {property.location.state}, {property.location.country}
              </h2>

              <p className="text-muted-foreground text-sm">
                {property.maxGuests} hóspedes &bull; {property.bedrooms} quartos
                &bull; {property.bathrooms} banheiros &bull; {property.sizeM2}{' '}
                m²
              </p>
            </div>

            <div className="flex items-center justify-center gap-1">
              <Star className="text-primary size-6" fill="currentColor" />
              <p className="text-muted-foreground font-medium">
                {property.rating}
              </p>
              <p className="text-muted-foreground">({property.reviewsCount})</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-1">
            <h2 className="text-xl font-bold">
              Anfitrião: {property.host.name}
            </h2>

            <p className="text-muted-foreground text-sm">
              {property.host.superHost && 'Superhost'} &bull; Hospeda desde{' '}
              {format(property.host.since, 'dd/MM/yyyy')}
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Descrição</h2>

            <div className="text-muted-foreground space-y-2 text-sm">
              <p>
                Este imóvel oferece todo o conforto e praticidade que você
                procura para viver bem. Com um design moderno e ambientes bem
                distribuídos, ele proporciona uma excelente iluminação natural e
                ventilação, criando um espaço aconchegante e funcional.
                Localizado em uma região privilegiada, o imóvel está próximo a
                comércios, escolas, supermercados e opções de lazer, garantindo
                conveniência no dia a dia.
              </p>

              <p>
                A sala ampla integra-se harmoniosamente à cozinha, oferecendo um
                ambiente perfeito para receber amigos e familiares. Os
                acabamentos de qualidade e o cuidado nos detalhes tornam o
                espaço ainda mais agradável e acolhedor. Além disso, a área
                externa conta com espaço para relaxar e aproveitar momentos ao
                ar livre. Ideal para quem busca conforto, praticidade e
                qualidade de vida, este imóvel é uma excelente oportunidade para
                morar ou investir.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-xl font-bold">Comodidades</h2>

            <ul className="text-muted-foreground grid grid-cols-2 gap-6 sm:grid-cols-3">
              {property.amenities.slice(0, 6).map((amenity) => (
                <li key={amenity} className="flex items-center gap-2">
                  <Amenity
                    amenity={amenity}
                    iconClassName="size-6 text-2xl"
                    labelClassName="text-sm"
                    showLabel
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Localização</h2>

            <div className="bg-muted flex h-56 items-center justify-center rounded-lg">
              <iframe
                allowFullScreen
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={generateGoogleMapsUrl({
                  city: property.location.city,
                  state: property.location.state,
                })}
                style={{ border: 0 }}
                title="Mapa do endereço"
              />
            </div>
          </div>
        </div>

        <Card className="fixed inset-x-0 bottom-0 flex h-fit w-full flex-row flex-wrap items-center justify-between lg:sticky lg:top-24 lg:max-w-80 lg:flex-col lg:justify-center">
          <CardHeader className="w-full flex-1 px-2 md:px-4 lg:flex-none lg:px-6">
            <CardTitle className="text-base sm:text-xl">
              <span className="font-bold underline">
                {formatCurrency(property.pricePerNight)}
              </span>{' '}
              /noite
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Hospedado por {property.host.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="w-fit px-2 md:px-4 lg:w-full lg:px-6">
            <Button className="w-full" disabled={!property.isAvailable}>
              {property.isAvailable ? 'Reserve' : 'Indisponível'}
            </Button>
          </CardContent>
        </Card>
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
