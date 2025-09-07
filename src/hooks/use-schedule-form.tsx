'use client'

import { createBookingAction } from '@/actions/booking'
import { scheduleFormSchema, ScheduleFormSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays } from 'date-fns'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type UseScheduleFormProps = {
  propertyId: number
  checkin?: string
  checkout?: string
  guests?: number
}

export function useScheduleForm({
  propertyId,
  checkin,
  checkout,
  guests,
}: UseScheduleFormProps) {
  const form = useForm<ScheduleFormSchema>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      range: {
        from: checkin ? new Date(checkin) : new Date(),
        to: checkout ? new Date(checkout) : addDays(new Date(), 2),
      },
      guests: guests ?? 1,
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
