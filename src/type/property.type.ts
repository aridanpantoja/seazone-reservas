export type Property = {
  id: number
  title: string
  type: string
  location: {
    city: string
    state: string
    country: string
  }
  pricePerNight: number
  maxGuests: number
  bedrooms: number
  bathrooms: number
  sizeM2: number
  isAvailable: boolean
  rating: number
  reviewsCount: number
  amenities: string[]
  images: string[]
  host: {
    name: string
    superHost: boolean
    since: string
  }
}

export type PropertiesFilters = {
  _limit?: number
  _page?: number
  _per_page?: number
  _sort?: string
  _order?: string
  minPrice?: number
  maxPrice?: number
  guests?: number
  bedrooms?: number
  available?: boolean
  amenities?: string
  city?: string
  state?: string
  type?: string
}
