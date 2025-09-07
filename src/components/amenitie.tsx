import { cn } from '../lib/utils'
import type { LucideProps } from 'lucide-react'

type AmenitieProps = {
  amenity: string
} & LucideProps

import {
  Wifi,
  Tv,
  Car,
  CookingPot,
  WashingMachine,
  Snowflake,
  type LucideIcon,
  Cat,
  Heater,
  FlameKindling,
  Bath,
  Sun,
  Dumbbell,
  Flame,
  WavesLadder,
  Hotel,
  Plus,
} from 'lucide-react'

export const amenitiesIcons: Record<string, LucideIcon> = {
  wifi: Wifi,
  'ar-condicionado': Snowflake,
  garagem: Car,
  'cozinha-equipada': CookingPot,
  'smart-tv': Tv,
  lavadora: WashingMachine,
  piscina: WavesLadder,
  churrasqueira: Flame,
  varanda: Hotel,
  'vista-mar': Sun,
  academia: Dumbbell,
  jacuzzi: Bath,
  lareira: FlameKindling,
  aquecimento: Heater,
  'pet-friendly': Cat,
}

const getAmenityIcon = (amenity: string) => {
  return amenitiesIcons[amenity] || Plus
}

export function Amenitie({ amenity, className, ...props }: AmenitieProps) {
  const Icon = getAmenityIcon(amenity)

  return <Icon className={cn('size-5', className)} {...props} />
}
