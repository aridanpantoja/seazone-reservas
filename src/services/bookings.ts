import api from '@/config/http'
import type { Booking } from '@/types/booking.type'

export async function createBooking(booking: Booking): Promise<Booking> {
  const response = await api.post<Booking>('/bookings', booking)
  return response.data
}
