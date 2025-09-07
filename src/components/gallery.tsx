'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Property } from '@/types/property.type'
import { LayoutGrid } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function Gallery({ property }: { property: Property }) {
  const [open, setOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null,
  )

  const galleryImages = property.images

  return (
    <>
      <div
        className={cn(
          'relative grid max-h-[500px] grid-cols-1 overflow-hidden rounded-2xl',
          galleryImages.length > 1 && 'gap-2 md:grid-cols-2',
        )}
      >
        <button
          className="relative h-full w-full"
          onClick={() => setCurrentImageIndex(0)}
        >
          <Image
            src={galleryImages[0]}
            alt={property.title}
            priority={true}
            className="h-full w-full object-cover object-center"
            width={1000}
            height={1000}
          />
        </button>

        <div
          className={cn(
            'hidden h-full',
            galleryImages.length === 1 && 'hidden',
            galleryImages.length === 2 && 'flex-col gap-2 md:flex',
            galleryImages.length > 2 && 'grid-cols-2 gap-2 md:grid',
          )}
        >
          {galleryImages.slice(1, 6).map((image, index) => (
            <button
              key={index}
              className={cn(
                'relative h-full w-full',
                galleryImages.length === 3 && index === 0 && 'col-span-2',
              )}
              onClick={() => setCurrentImageIndex(index + 1)}
            >
              <Image
                src={image}
                alt={property.title}
                width={1000}
                height={1000}
              />
            </button>
          ))}
        </div>

        {/* <Button
          variant="outline"
          className={cn(
            'absolute right-4 bottom-4',
            property.images.length === 1 && 'hidden',
          )}
          onClick={() => setCurrentImageIndex(0)}
        >
          <LayoutGrid /> Mostrar todas as fotos
        </Button> */}
      </div>

      {open && currentImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setOpen(false)}
        >
          <Image
            src={property.images[currentImageIndex]}
            alt={property.title}
            width={1000}
            height={1000}
          />
        </div>
      )}
    </>
  )
}
