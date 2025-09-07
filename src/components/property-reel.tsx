import Image from 'next/image'
import { getProperties } from '../services/properties'
import type { PropertiesFilters, Property } from '../type/property.type'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Check, CircleX, Star, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDateForURL } from '@/lib/utils'
import { ImageSlider } from './image-slider'

type PropertyReelProps = {
  title?: string
  subtitle?: string
  link?: string
  filters?: PropertiesFilters
  initialProperties?: Property[]
}

export async function PropertyReel({
  title,
  filters,
  subtitle,
  link,
  initialProperties,
}: PropertyReelProps) {
  const properties = initialProperties || (await getProperties(filters))

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          {title && <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>}
          {subtitle && (
            <p className="text-xs text-gray-500 sm:text-sm">{subtitle}</p>
          )}
        </div>

        {link && (
          <Link
            href={link}
            className="text-primary hidden underline underline-offset-4 sm:inline-flex"
          >
            Ver todos &rarr;
          </Link>
        )}
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {properties.map((property) => {
          const checkIn = new Date()
          const checkOut = new Date()
          checkOut.setDate(checkOut.getDate() + 7)
          const guests = 2

          return (
            <Link
              key={property.id}
              href={`/acomodacoes/${property.id}?checkin=${formatDateForURL(checkIn)}&checkout=${formatDateForURL(checkOut)}&hospedes=${guests}`}
              className="space-y-3 overflow-hidden rounded-xl"
              target="_blank"
              aria-label={property.title}
              id={`property-${property.id}`}
            >
              <div className="relative block w-full overflow-hidden rounded-xl">
                <ImageSlider urls={property.images} />

                <Badge
                  variant={property.isAvailable ? 'secondary' : 'default'}
                  className="absolute top-3 left-3"
                >
                  {property.isAvailable ? <Check /> : <X />}
                  {property.isAvailable ? 'Disponível' : 'Indisponível'}
                </Badge>
              </div>

              <div className="flex flex-col gap-1 p-1">
                <div className="flex items-start justify-between gap-1">
                  <h2 className="text-xs font-semibold tracking-[0.28px]">
                    {property.title}
                  </h2>

                  <div className="flex shrink-0 items-center justify-center gap-1 text-xs">
                    <Star className="text-primary size-3" fill="currentColor" />
                    <span>
                      {property.rating} ({property.reviewsCount})
                    </span>
                  </div>
                </div>

                <h2 className="text-muted-foreground text-xs font-medium">
                  <span className="text-muted-foreground text-xs">
                    {property.location.city}, {property.location.state},{' '}
                    {property.location.country}
                  </span>
                </h2>

                <h2>
                  <span className="font-bold">
                    {formatCurrency(property.pricePerNight)}
                  </span>
                  <span className="ml-1 text-xs">/noite</span>
                </h2>
              </div>
            </Link>
          )
        })}
      </ul>
    </section>
  )
}
