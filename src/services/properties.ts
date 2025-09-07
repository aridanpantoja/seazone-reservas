import api from '../config/http'
import type { Property, PropertiesFilters } from '../types/property.type'

export async function getProperties(
  filters?: PropertiesFilters,
): Promise<Property[]> {
  const response = await api.get<Property[]>('/properties', { params: filters })
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
