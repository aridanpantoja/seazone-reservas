import { ScheduleForm } from '@/components/schedule-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { WidthWrapper } from '@/components/width-wrapper'
import { getPropertyById } from '@/services/properties'
import { MapPin, Pin } from 'lucide-react'
import type { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type AccommodationPageProps = {
  params: Promise<{ id: number }>
  searchParams: Promise<{
    checkin?: string
    checkout?: string
    hospedes?: number
  }>
}

export default async function AccommodationPage({
  params,
  searchParams,
}: AccommodationPageProps) {
  const { id } = await params
  const { checkin, checkout, hospedes } = await searchParams

  const property = await getPropertyById(id)

  if (!property) {
    notFound()
  }

  return (
    <WidthWrapper className="max-w-screen-xl">
      <main className="space-y-8 py-10">
        <section>
          <h1 className="text-2xl font-bold md:text-3xl">Reservar</h1>
        </section>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <ScheduleForm
            property={property}
            checkin={checkin}
            checkout={checkout}
            guests={hospedes}
          />

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative size-24 overflow-hidden rounded-lg">
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      width={256}
                      height={256}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{property.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="size-4" /> {property.location.city},{' '}
                      {property.location.state},{property.location.country}
                    </CardDescription>
                    <p className="text-muted-foreground text-sm">
                      {property.type}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <Separator />

            <CardContent>
              <div className="flex flex-col gap-2">
                <p>Check-in: {checkin}</p>
                <p>Check-out: {checkout}</p>
                <p>Hóspedes: {hospedes}</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </WidthWrapper>
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
