import Image from 'next/image'
import { getProperties } from '../services/properties'
import type { PropertiesFilters } from '../type/property.type'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Check, CircleX, Star, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'

type PropertyReelProps = {
  title?: string
  subtitle?: string
  link?: string
  filters?: PropertiesFilters
}

export async function PropertyReel({
  title,
  filters,
  subtitle,
  link,
}: PropertyReelProps) {
  const properties = await getProperties(filters)

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          {title && <h1 className="text-2xl font-bold">{title}</h1>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>

        {link && (
          <Link
            href={link}
            className={buttonVariants({ variant: 'link', size: 'sm' })}
          >
            Ver todos &rarr;
          </Link>
        )}
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties.map((property) => (
          <Link
            key={property.id}
            href={`/acomodacoes/${property.id}`}
            className="space-y-4"
          >
            <div className="relative block w-full overflow-hidden rounded-lg">
              <Image
                src={property.images[0]}
                alt={property.title}
                width={500}
                height={500}
                loading="lazy"
                className="h-full w-full object-cover"
              />

              <Badge
                variant={property.isAvailable ? 'secondary' : 'default'}
                className="absolute top-3 left-3"
              >
                {property.isAvailable ? <Check /> : <X />}
                {property.isAvailable ? 'Disponível' : 'Indisponível'}
              </Badge>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-start justify-between gap-1">
                <h2 className="text-xs font-semibold tracking-[0.28px]">
                  {property.title}
                </h2>

                <div className="flex shrink-0 items-center justify-center gap-1 text-xs">
                  <Star className="text-primary size-3" />
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
        ))}
      </ul>
    </section>
  )
}
