'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import Link from 'next/link'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Label } from '@/components/ui/label'
import { Property } from '@/types/property.type'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'

export function ScheduleCard(property: Property) {
  const searchParams = useSearchParams()
  const checkIn = searchParams.get('checkin')
  const checkOut = searchParams.get('checkout')
  const guestsParam = searchParams.get('hospedes')

  const [guests, setGuests] = useState<number>(
    guestsParam ? Number(guestsParam) : 1,
  )
  const [date, setDate] = useState<DateRange | undefined>({
    from: checkIn ? new Date(checkIn) : new Date(),
    to: checkOut ? new Date(checkOut) : new Date(),
  })

  return (
    <div className="sticky top-24 h-fit w-full max-w-80 rounded-xl border p-6">
      <div className="flex flex-col gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <div className="space-y-2">
              <Label>Check-in</Label>

              <Button
                variant={'outline'}
                className={cn(
                  'w-full pl-3 text-left font-normal',
                  !date && 'text-muted-foreground',
                )}
              >
                {date?.from && date.to ? (
                  <span>
                    {format(date.from, 'dd/MM/yyyy')} até{' '}
                    {format(date.to, 'dd/MM/yyyy')}
                  </span>
                ) : (
                  <span>Selecione uma data</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={date}
              onSelect={(date) => {
                setDate(date ?? { from: new Date(), to: new Date() })
              }}
              numberOfMonths={2}
              showOutsideDays={false}
              disabled={(date) => date < new Date('1900-01-01')}
            />
          </PopoverContent>
        </Popover>

        <Input
          type="number"
          placeholder="Hóspedes"
          value={guests}
          onChange={(e) => {}}
        />

        <Link
          href={`/reserva/${property.id}`}
          className={buttonVariants({
            className: 'w-full',
          })}
        >
          Verificar disponibilidade
        </Link>

        <span className="text-muted-foreground text-center text-xs">
          Você ainda não será cobrado
        </span>
      </div>
    </div>
  )
}
