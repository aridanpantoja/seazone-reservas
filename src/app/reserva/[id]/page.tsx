import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { getProperties, getPropertyById } from '../../../services/properties'
import type { Property } from '../../../type/property.type'
import { WidthWrapper } from '@/components/width-wrapper'

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
    <WidthWrapper className="max-w-screen-xl">
      <section>
        <h1>Reserva</h1>
      </section>
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

  return {
    title: property.title,
    openGraph: {
      images: [property.images[0], ...previousImages],
    },
  }
}
