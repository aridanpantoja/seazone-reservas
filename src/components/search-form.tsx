'use client'

import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

export function SearchForm({
  className,
  expanded,
}: {
  className?: string
  expanded?: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="rounded-full">
          <div
            className={cn(
              'border-input bg-background hover:border-primary/40 flex h-full items-center gap-4 rounded-full border p-2 py-1 pr-1.5 pl-4 text-sm transition-all hover:cursor-pointer hover:shadow-xs data-[expanded=true]:p-2 data-[expanded=true]:pl-6',
              className,
            )}
            data-expanded={expanded}
          >
            <span>Qualquer lugar</span>

            <div className="bg-muted h-[20px] w-[1px]"></div>

            <span>Qualquer semana</span>

            <div className="bg-muted h-[20px] w-[1px]"></div>

            <span>Hóspedes?</span>

            <div className="bg-primary text-primary-foreground flex flex-col gap-1 rounded-full p-2">
              <Search className="size-4" />
            </div>
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pesquisar</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
