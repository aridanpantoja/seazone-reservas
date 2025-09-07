'use client'

import { useEffect, useState, useCallback } from 'react'
import type { Swiper as SwiperType } from 'swiper'

export function useImageSlider(urls: string[]) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(urls.length <= 1)

  useEffect(() => {
    if (!swiper) return

    const handleSlideChange = () => {
      setActiveIndex(swiper.activeIndex)
      setIsBeginning(swiper.isBeginning)
      setIsEnd(swiper.isEnd)
    }

    swiper.on('slideChange', handleSlideChange)
    return () => {
      swiper.off('slideChange', handleSlideChange)
    }
  }, [swiper])

  const handleNext = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      swiper?.slideNext()
    },
    [swiper],
  )

  const handlePrev = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      swiper?.slidePrev()
    },
    [swiper],
  )

  return {
    swiper,
    activeIndex,
    isBeginning,
    isEnd,
    setSwiper,
    handleNext,
    handlePrev,
  }
}
