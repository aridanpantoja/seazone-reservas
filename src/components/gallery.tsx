import { cn } from '@/lib/utils'
import { Property } from '@/types/property.type'
import Image from 'next/image'

const defaultImageSize = {
  width: 720,
  height: 480,
}

export function Gallery({ property }: { property: Property }) {
  const galleryImages = property.images

  return (
    <div
      className={cn(
        'relative grid max-h-[500px] grid-cols-1 overflow-hidden rounded-2xl',
        galleryImages.length > 1 && 'gap-2 md:grid-cols-2',
      )}
    >
      <button className="relative h-full w-full">
        <Image
          src={galleryImages[0]}
          alt={property.title}
          priority={true}
          className="h-full w-full object-cover object-center"
          width={defaultImageSize.width}
          height={defaultImageSize.height}
        />
      </button>

      <div
        className={cn(
          'hidden h-full',
          galleryImages.length === 1 && 'hidden',
          galleryImages.length >= 2 && 'flex gap-2 md:flex',
        )}
      >
        {galleryImages.slice(1, 6).map((image, index) => (
          <button key={index} className={cn('relative h-full w-full')}>
            <Image
              src={image}
              alt={property.title}
              width={defaultImageSize.width}
              height={defaultImageSize.height}
              className="h-full w-full object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
