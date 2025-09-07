'use server'

import { createBooking } from '@/services/bookings'
import { scheduleFormSchema, ScheduleFormSchema } from '@/lib/validations'

export async function createBookingAction(
  data: ScheduleFormSchema,
  propertyId: number,
) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const parsedData = await scheduleFormSchema.safeParse(data)

    console.log('parsedData', parsedData.error?.message)

    if (!parsedData.success) {
      return {
        success: false,
        message: parsedData.error.message,
      }
    }

    console.log(parsedData.data)

    const { range, guests } = parsedData.data

    const response = await createBooking({
      propertyId,
      checkIn: range.from.toISOString(),
      checkOut: range.to.toISOString(),
      guests: guests.adults + guests.children,
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
    })

    console.log(response)

    if (!response) {
      throw new Error('Erro ao criar reserva')
    }

    console.log('Reserva criada com sucesso')

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
