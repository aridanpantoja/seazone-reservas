import { getProperties } from '@/services/properties'
import Link from 'next/link'

export default async function Home() {
  const properties = await getProperties()

  return (
    <div>
      {properties.map((property) => (
        <div key={property.id}>
          <h1>{property.title}</h1>
          <p>{property.bathrooms}</p>
          <Link href={`/acomodacoes/${property.id}`}>Ver mais</Link>
        </div>
      ))}
    </div>
  )
}
