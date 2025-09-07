'use client'

import { createBookingAction } from '@/actions/booking'
import { scheduleFormSchema, ScheduleFormSchema } from '@/lib/validations'
import { createBooking } from '@/services/bookings'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type UseScheduleFormProps = {
  propertyId: number
}

export function useScheduleForm({ propertyId }: UseScheduleFormProps) {
  const form = useForm<ScheduleFormSchema>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      range: {
        from: new Date(),
        to: new Date(),
      },
      guests: {
        adults: 1,
        children: 0,
      },
    },
  })

  const handleSubmit = async (data: ScheduleFormSchema) => {
    try {
      const response = await createBookingAction(data, propertyId)

      if (response.success) {
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }
    } catch {
      toast.error('Erro ao criar reserva')
    }
  }

  return { form, handleSubmit }
}
