// src/services/properties.ts
import api from '@/config/http'
import { Property } from '@/type/property.type'

export async function getProperties(): Promise<Property[]> {
  const response = await api.get<Property[]>('/properties')
  return response.data
}

export async function getPropertyById(id: number): Promise<Property> {
  const response = await api.get<Property>(`/properties/${id}`)
  return response.data
}
