'use server'

import { createBooking } from '@/services/bookings'
import { scheduleFormSchema, ScheduleFormSchema } from '@/lib/validations'
import type { Property } from '@/types/property.type'

export async function createBookingAction(
  data: ScheduleFormSchema,
  property: Property,
) {
  try {
    const parsedData = await scheduleFormSchema.safeParse(data)

    if (!parsedData.success) {
      return {
        success: false,
        message: parsedData.error.message,
      }
    }

    const { range, guests } = parsedData.data

    if (guests > property.maxGuests) {
      return {
        success: false,
        message: 'Número de hóspedes é maior que o máximo de hóspedes',
      }
    }

    const response = await createBooking({
      propertyId: property.id,
      checkIn: range.from.toISOString(),
      checkOut: range.to.toISOString(),
      guests: guests,
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
