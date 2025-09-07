import api from '../config/http'
import type { Property, PropertiesFilters } from '../type/property.type'

export async function getProperties(
  filters?: PropertiesFilters,
): Promise<Property[]> {
  console.log(filters)

  const response = await api.get<Property[]>('/properties', { params: filters })

  console.log(response)

  return response.data
}

export async function getPropertyById(id: number): Promise<Property | null> {
  try {
    const response = await api.get<Property>(`/properties/${id}`)
    return response.data
  } catch {
    return null
  }
}
