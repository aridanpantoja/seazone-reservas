'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Property } from '@/type/property.type'
import { LayoutGrid } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function Gallery({ property }: { property: Property }) {
  const [open, setOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null,
  )

  const images = [property.images[1], property.images[0], property.images[1]]

  return (
    <>
      <div
        className={cn(
          'relative grid max-h-[600px] rounded-2xl',
          images.length > 1 ? 'gap-2 md:grid-cols-2' : 'grid-cols-1',
        )}
      >
        <button
          className="relative h-full w-full"
          onClick={() => setCurrentImageIndex(0)}
        >
          <Image
            src={images[0]}
            alt={property.title}
            priority={true}
            className="h-full w-full object-cover"
            width={1000}
            height={1000}
          />
        </button>

        <div
          className={cn(
            'hidden h-full',
            images.length === 1 && 'hidden',
            images.length === 2 && 'flex-col gap-2 md:flex',
            images.length > 2 && 'grid-cols-2 gap-2 md:grid',
          )}
        >
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                'relative h-full w-full',
                images.length === 3 && index === 0 && 'col-span-2',
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
