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
import { Property } from '@/type/property.type'

export function ScheduleCard(property: Property) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })

  return (
    <div className="sticky top-14 h-fit w-full max-w-80 rounded-xl border p-6">
      <div className="flex flex-col gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Check-in</Label>

                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  {date ? (
                    <span>
                      {date.from?.toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </span>
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Check-out</Label>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  {date ? (
                    <span>
                      {date.to?.toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </span>
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              showOutsideDays={false}
              disabled={(date) => date < new Date('1900-01-01')}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              Verificar disponibilidade
            </Button>
          </PopoverTrigger>
        </Popover>

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
