'use client'

import { useScroll } from 'motion/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Icons } from '@/components/icons'
import { SheetMenu } from '@/components/sheet-menu'
import { WidthWrapper } from '@/components/width-wrapper'
import { SearchForm } from './search-form'

const SCROLL_THRESHOLD_INACTIVE = 20
const SCROLL_THRESHOLD_ACTIVE = 50

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      if (latest < SCROLL_THRESHOLD_INACTIVE) {
        setScrolled(false)
      } else if (latest > SCROLL_THRESHOLD_ACTIVE) {
        setScrolled(true)
      }
    })

    return () => unsubscribe()
  }, [scrollY])

  return (
    <header
      data-scrolled={scrolled}
      className="bg-background data-[scrolled=true]:bg-background/60 group sticky top-0 z-50 h-fit w-full transition-all data-[scrolled=true]:border-b data-[scrolled=true]:shadow-xs data-[scrolled=true]:backdrop-blur-2xl"
    >
      <WidthWrapper>
        <nav className="relative flex h-24 w-full flex-wrap items-center justify-between gap-6 transition-all group-data-[scrolled=true]:h-18">
          <div className="flex w-full items-center justify-between gap-2 lg:w-full">
            <Link aria-label="Home" href="/">
              <Icons.logo />
            </Link>

            <div className="static left-1/2 ml-auto translate-x-0 lg:absolute lg:-translate-x-1/2">
              <SearchForm expanded={!scrolled} />
            </div>

            <SheetMenu />
          </div>
        </nav>
      </WidthWrapper>
    </header>
  )
}
