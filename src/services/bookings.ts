import api from '@/config/http'
import type { Booking } from '@/type/booking.type'

export async function createBooking(booking: Booking): Promise<Booking> {
  const response = await api.post<Booking>('/bookings', booking)
  return response.data
}
