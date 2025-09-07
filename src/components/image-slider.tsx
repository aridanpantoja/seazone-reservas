'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useImageSlider } from '@/hooks/use-image-slider'

import 'swiper/css'
import 'swiper/css/pagination'

type ImageSliderProps = {
  urls: string[]
}

export function ImageSlider({ urls }: ImageSliderProps) {
  const { isBeginning, isEnd, setSwiper, handleNext, handlePrev } =
    useImageSlider(urls)

  return (
    <div className="group bg-muted relative aspect-square overflow-hidden rounded-xl">
      <div className="pointer-events-none absolute inset-0 z-20 flex w-full items-center justify-between px-3 opacity-0 transition-opacity hover:opacity-100">
        <Button
          size="icon"
          variant="outline"
          onClick={handlePrev}
          disabled={isBeginning}
          aria-label="Imagem anterior"
          data-beginning={isBeginning}
          className={cn(
            'pointer-events-auto absolute left-3 z-20 rounded-full data-[beginning=true]:hidden',
          )}
        >
          <ChevronLeft />
        </Button>

        <Button
          size="icon"
          variant="outline"
          onClick={handleNext}
          disabled={isEnd}
          aria-label="Próxima imagem"
          data-end={isEnd}
          className={cn(
            'pointer-events-auto absolute right-3 z-20 rounded-full data-[end=true]:hidden',
          )}
        >
          <ChevronRight />
        </Button>
      </div>
      {/* Swiper */}
      <Swiper
        onSwiper={setSwiper}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="size-2 rounded-full  ${className}"></span>`
          },
        }}
        className="h-full w-full"
      >
        {urls.map((url, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            <Image
              fill
              priority={index === 0}
              src={url}
              alt={`Imagem ${index + 1}`}
              className="h-full w-full object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
