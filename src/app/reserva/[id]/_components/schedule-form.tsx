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
import { Property } from '@/type/property.type'
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
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="range.from"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Check-in</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value && isValid(field.value) ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      field.value && isValid(field.value)
                        ? field.value
                        : undefined
                    }
                    numberOfMonths={2}
                    onSelect={field.onChange}
                    disabled={(date) => date <= new Date('1900-01-01')}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="range.to"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Check-out</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value && isValid(field.value) ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      field.value && isValid(field.value)
                        ? field.value
                        : undefined
                    }
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date <= new Date('1900-01-01') || date <= range.from
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
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
