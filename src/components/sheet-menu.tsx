'use client'

import { Home, Menu, Search } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/theme-toggle'

const NAVBAR_LINKS = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/s', label: 'Buscar acomodações', Icon: Search },
] as const

export function SheetMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="px-6">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>O que você deseja fazer?</SheetDescription>
        </SheetHeader>

        <Separator />

        <span className="px-6 text-lg font-medium">Navegação</span>

        <ul className="flex flex-col gap-2 px-4">
          {NAVBAR_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full items-center justify-start !px-2',
                size: 'lg',
              })}
              onClick={() => setOpen(false)}
            >
              <link.Icon className="size-5" />
              {link.label}
            </Link>
          ))}
        </ul>

        <Separator />

        <div className="mt-auto flex flex-col gap-2 p-4">
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  )
}
