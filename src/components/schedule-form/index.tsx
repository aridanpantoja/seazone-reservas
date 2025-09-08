'use client'

import { LoadingButton } from '@/components/loading-button'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useScheduleForm } from '@/hooks/use-schedule-form'
import { cn } from '@/lib/utils'
import { Property } from '@/types/property.type'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

type ScheduleFormProps = {
  property: Property
  checkin?: string
  checkout?: string
  guests?: number
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function ScheduleForm(props: ScheduleFormProps) {
  const { property, checkin, checkout, guests } = props

  const { form, handleSubmit, numberOfNights, totalPrice } = useScheduleForm({
    property,
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
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
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
                          {format(field.value.from, 'dd/MM/y', {
                            locale: ptBR,
                          })}
                          -
                          {format(field.value.to, 'dd/MM/y', {
                            locale: ptBR,
                          })}
                        </>
                      ) : (
                        format(field.value.from, 'dd/MM/y', { locale: ptBR })
                      )
                    ) : (
                      <span>Selecione um período</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    defaultMonth={field.value.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>
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
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  min={1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {numberOfNights > 0 && (
          <div className="bg-muted/20 mt-4 space-y-4 rounded-lg border p-4 md:col-span-2">
            <h3 className="text-lg font-semibold">Resumo da Reserva</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <p className="text-muted-foreground">
                  {formatCurrency(property.pricePerNight)} x {numberOfNights}{' '}
                  {numberOfNights > 1 ? 'noites' : 'noite'}
                </p>
                <p>{formatCurrency(totalPrice)}</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-bold">
                <p>Total</p>
                <p>{formatCurrency(totalPrice)}</p>
              </div>
            </div>
          </div>
        )}

        <LoadingButton
          type="submit"
          className="md:col-span-2"
          loading={isSubmitting}
          disabled={isSubmitting || numberOfNights === 0}
        >
          Reservar
        </LoadingButton>
      </form>
    </Form>
  )
}
