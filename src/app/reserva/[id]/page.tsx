import { WidthWrapper } from '@/components/width-wrapper'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { getProperties, getPropertyById } from '@/services/properties'
import type { Property } from '@/type/property.type'
import { ScheduleForm } from './_components/schedule-form'

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
    <WidthWrapper className="max-w-screen-lg">
      <main className="py-10">
        <section>
          <h1 className="text-2xl font-bold">Reserva {property.title}</h1>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold">Detalhes da reserva</h2>

              <ScheduleForm {...property} />
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
