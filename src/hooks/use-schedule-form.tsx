'use client'

import { createBookingAction } from '@/actions/booking'
import { scheduleFormSchema, ScheduleFormSchema } from '@/lib/validations'
import type { Property } from '@/types/property.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInDays } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type UseScheduleFormProps = {
  property: Property
  checkin?: string
  checkout?: string
  guests?: number
}

export function useScheduleForm({
  property,
  checkin,
  checkout,
  guests,
}: UseScheduleFormProps) {
  const router = useRouter()

  const form = useForm<ScheduleFormSchema>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      range: {
        from: checkin ? new Date(checkin) : undefined,
        to: checkout ? new Date(checkout) : undefined,
      },
      guests: guests ?? 1,
    },
  })

  const [numberOfNights, setNumberOfNights] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const range = form.watch('range')

  useEffect(() => {
    if (range?.from && range?.to) {
      const nights = differenceInDays(range.to, range.from)

      if (nights > 0) {
        setNumberOfNights(nights)
        setTotalPrice(nights * property.pricePerNight)
      } else {
        setNumberOfNights(0)
        setTotalPrice(0)
      }
    } else {
      setNumberOfNights(0)
      setTotalPrice(0)
    }
  }, [range, property.pricePerNight])

  const handleSubmit = async (data: ScheduleFormSchema) => {
    try {
      const response = await createBookingAction(data, property)

      if (response.success) {
        toast.success(response.message, {
          description: 'Você será redirecionado para a tela inicial',
          duration: 5000,
        })

        setTimeout(() => {
          router.push('/')
        }, 5000)
      } else {
        toast.error(response.message, {
          description: 'Tente novamente mais tarde',
          duration: 5000,
        })
      }
    } catch {
      toast.error('Erro ao criar reserva')
    }
  }

  return { form, handleSubmit, numberOfNights, totalPrice }
}
