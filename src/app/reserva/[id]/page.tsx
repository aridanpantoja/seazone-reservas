import { WidthWrapper } from '@/components/width-wrapper'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { getProperties, getPropertyById } from '@/services/properties'
import type { Property } from '@/types/property.type'
import { ScheduleForm } from './_components/schedule-form'

type AccommodationPageProps = {
  params: Promise<{ id: number }>
  searchParams: Promise<{
    checkin?: string
    checkout?: string
    adultos?: number
    criancas?: number
  }>
}

export default async function AccommodationPage({
  params,
  searchParams,
}: AccommodationPageProps) {
  const { id } = await params
  const { checkin, checkout, adultos, criancas } = await searchParams

  const property = await getPropertyById(id)

  if (!property) {
    notFound()
  }

  return (
    <WidthWrapper className="max-w-screen-xl">
      <main className="space-y-8 py-10">
        <section>
          <h1 className="text-4xl font-bold">Reservar</h1>
        </section>

        <section className="grid grid-cols-2 gap-8">
          <div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">Detalhes da reserva</h2>

                <ScheduleForm
                  property={property}
                  checkin={checkin}
                  checkout={checkout}
                  adultos={adultos}
                  criancas={criancas}
                />
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg border p-4">
            <h2 className="text-lg font-bold">Detalhes da reserva</h2>

            <div className="flex flex-col gap-2">
              <p>Check-in: {checkin}</p>
              <p>Check-out: {checkout}</p>
              <p>Adultos: {adultos}</p>
              <p>Crianças: {criancas}</p>
            </div>
          </div>
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
