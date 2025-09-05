import { WidthWrapper } from '@/components/width-wrapper'
import { getProperties, getPropertyById } from '@/services/properties'
import type { Property } from '@/type/property.type'
import type { ResolvingMetadata } from 'next'
import type { Metadata } from 'next'
import Image from 'next/image'
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
    <div className="py-10">
      <section>
        <WidthWrapper>
          <div>
            <Image
              src={property.images[0]}
              alt={property.title}
              width={1000}
              height={1000}
              priority={true}
            />
            <h1>{property.title}</h1>
            <p>{property.bathrooms}</p>
          </div>
        </WidthWrapper>
      </section>
    </div>
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
