'use server'

import { createBooking } from '@/services/bookings'
import { scheduleFormSchema, ScheduleFormSchema } from '@/lib/validations'

export async function createBookingAction(
  data: ScheduleFormSchema,
  propertyId: number,
) {
  try {
    const parsedData = await scheduleFormSchema.safeParse(data)

    if (!parsedData.success) {
      return {
        success: false,
        message: 'Dados inválidos',
      }
    }

    const { range, guests } = parsedData.data

    const response = await createBooking({
      propertyId,
      checkIn: range.from.toISOString(),
      checkOut: range.to.toISOString(),
      guests: guests.adults + guests.children,
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
    })

    if (!response) {
      throw new Error('Erro ao criar reserva')
    }

    return {
      success: true,
      message: 'Reserva criada com sucesso',
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Erro ao criar reserva',
    }
  }
}
