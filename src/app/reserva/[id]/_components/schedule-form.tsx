'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useScheduleForm } from '@/hooks/use-schedule-form'
import { format, isValid } from 'date-fns'
import { cn } from '@/lib/utils'
import { Property } from '@/types/property.type'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { LoadingButton } from '@/components/loading-button'

type ScheduleFormProps = {
  property: Property
  checkin?: string
  checkout?: string
  adultos?: number
  criancas?: number
}

export function ScheduleForm(props: ScheduleFormProps) {
  const { property, checkin, checkout, adultos, criancas } = props
  const { form, handleSubmit } = useScheduleForm({
    propertyId: property.id,
    checkin,
    checkout,
    adultos,
    criancas,
  })

  const {
    watch,
    formState: { isSubmitting },
  } = form

  const { range } = watch()

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
              <FormLabel>Datas</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value.from && 'text-muted-foreground',
                        )}
                      >
                        {field.value.from ? (
                          <span>
                            {field.value.from?.toLocaleDateString('pt-BR', {
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
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value.to && 'text-muted-foreground',
                        )}
                      >
                        {field.value.to ? (
                          <span>
                            {field.value.to?.toLocaleDateString('pt-BR', {
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
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                    showOutsideDays={false}
                    disabled={(date) => date < new Date('1900-01-01')}
                  />
                </PopoverContent>
              </Popover>

              {form.formState.errors.range?.to && (
                <FormMessage>
                  {form.formState.errors.range.to.message}
                </FormMessage>
              )}

              {form.formState.errors.range?.from && (
                <FormMessage>
                  {form.formState.errors.range.from.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="guests.adults"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adultos</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="guests.children"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crianças</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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
