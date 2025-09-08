import { ScheduleForm } from '@/components/schedule-form'
import { buttonVariants } from '@/components/ui/button'
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
import { CircleX, MapPin, Wallet } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
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

  if (!property.isAvailable) {
    return (
      <WidthWrapper className="max-w-screen-lg">
        <section className="flex min-h-64 flex-col items-center justify-center gap-4 text-center">
          <CircleX className="text-primary size-10" />
          <h2 className="text-muted-foreground text-base font-medium">
            Desculpe, esta propriedade não está mais disponível para a reserva
          </h2>

          <Link href="/" className={buttonVariants()}>
            Voltar para a página inicial
          </Link>
        </section>
      </WidthWrapper>
    )
  }

  return (
    <WidthWrapper className="max-w-screen-lg">
      <main className="space-y-8 py-10">
        <section>
          <h1 className="text-2xl font-bold md:text-3xl">Reservar</h1>
        </section>

        <section>
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
                      <MapPin className="text-primary size-4" />{' '}
                      {property.location.city}, {property.location.state},
                      {property.location.country}
                    </CardDescription>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Wallet className="text-primary size-4" />
                      <p className="text-sm">
                        R$ {property.pricePerNight} / noite
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <Separator />

            <CardContent>
              <ScheduleForm
                property={property}
                checkin={checkin}
                checkout={checkout}
                guests={hospedes}
              />
            </CardContent>
          </Card>
        </section>
      </main>
    </WidthWrapper>
  )
}

export async function generateMetadata({
  params,
}: AccommodationPageProps): Promise<Metadata> {
  const { id } = await params
  const property = await getPropertyById(id)

  if (!property) {
    return {
      title: 'Acomodação não encontrada',
    }
  }

  return {
    title: `Reservar ${property.title}`,
    description: `${property.type} em ${property.location.city}, ${property.location.state}. ${property.maxGuests} hóspedes, ${property.bedrooms} quartos, ${property.bathrooms} banheiros.`,
    openGraph: {
      title: `Reservar ${property.title}`,
      description: `${property.type} em ${property.location.city}, ${property.location.state}. ${property.maxGuests} hóspedes, ${property.bedrooms} quartos, ${property.bathrooms} banheiros.`,
      images: [property.images[0]],
    },
  }
}
