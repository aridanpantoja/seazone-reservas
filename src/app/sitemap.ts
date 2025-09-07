import { BASE_URL } from '@/config/siteConfig'
import { getProperties } from '@/services/properties'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getProperties()
  return properties.map((property) => ({
    url: `${BASE_URL}/acomodacoes/${property.id}`,
    lastModified: new Date(),
  }))
}
