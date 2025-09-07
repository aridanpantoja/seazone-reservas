'use client'

import { useScroll } from 'motion/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Icons } from '@/components/icons'
import { MobileMenu } from '@/components/mobile-menu'
import { WidthWrapper } from '@/components/width-wrapper'

const SCROLL_THRESHOLD_INACTIVE = 80
const SCROLL_THRESHOLD_ACTIVE = 160

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
      className="bg-muted data-[scrolled=true]:bg-muted/80 group sticky top-0 z-50 h-fit w-full transition-all data-[scrolled=true]:border-b data-[scrolled=true]:backdrop-blur-2xl"
    >
      <WidthWrapper>
        <nav className="relative flex h-24 w-full flex-wrap items-center justify-between gap-6 transition-all group-data-[scrolled=true]:h-18">
          <div className="flex w-full items-center justify-between gap-12 lg:w-full">
            <Link aria-label="Home" href="/">
              <Icons.logo />
            </Link>

            <MobileMenu />
          </div>
        </nav>
      </WidthWrapper>
    </header>
  )
}
