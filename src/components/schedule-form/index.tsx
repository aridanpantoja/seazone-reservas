'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useScheduleForm } from '@/hooks/use-schedule-form'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { Property } from '@/types/property.type'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { LoadingButton } from '@/components/loading-button'

type ScheduleFormProps = {
  property: Property
  checkin?: string
  checkout?: string
  guests?: number
}

export function ScheduleForm(props: ScheduleFormProps) {
  const { property, checkin, checkout, guests } = props
  const { form, handleSubmit } = useScheduleForm({
    propertyId: property.id,
    checkin,
    checkout,
    guests,
  })

  const {
    formState: { isSubmitting },
  } = form

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        <FormField
          control={form.control}
          name="range"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Período</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !field.value.from && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value?.from ? (
                      field.value.to ? (
                        <>
                          {format(field.value.from, 'LLL dd, y', {
                            locale: ptBR,
                          })}{' '}
                          -{' '}
                          {format(field.value.to, 'LLL dd, y', {
                            locale: ptBR,
                          })}
                        </>
                      ) : (
                        format(field.value.from, 'LLL dd, y', { locale: ptBR })
                      )
                    ) : (
                      <span>Selecione um período</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field.value.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                    // Desativa a seleção de datas anteriores a hoje
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>
              {/* Exibe mensagens de erro para o range como um todo ou campos específicos */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hóspedes</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Número de hóspedes"
                  {...field}
                  // O Zod já faz o 'coerce', mas é boa prática garantir o tipo number
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  min={1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton variant="outline" type="submit" loading={isSubmitting}>
          Reservar
        </LoadingButton>
      </form>
    </Form>
  )
}
