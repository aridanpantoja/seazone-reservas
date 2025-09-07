import api from '../config/http'
import type { Property, PropertiesFilters } from '../type/property.type'

export async function getProperties(
  filters?: PropertiesFilters,
): Promise<Property[]> {
  const response = await api.get<Property[]>('/properties', { params: filters })
  return response.data
}

export async function getPropertyById(id: number): Promise<Property> {
  const response = await api.get<Property>(`/properties/${id}`)
  return response.data
}
