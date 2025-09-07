import { cn } from '../lib/utils'
import type { LucideProps } from 'lucide-react'

type AmenitieProps = {
  amenity: string
  showIcon?: boolean
  showLabel?: boolean
  labelClassName?: string
  iconClassName?: string
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

export const amenitiesLabels: Record<string, string> = {
  wifi: 'Wifi',
  'ar-condicionado': 'Ar condicionado',
  garagem: 'Garagem',
  'cozinha-equipada': 'Cozinha equipada',
  'smart-tv': 'Smart TV',
  lavadora: 'Lavadora',
  piscina: 'Piscina',
  churrasqueira: 'Churrasqueira',
  varanda: 'Varanda',
  'vista-mar': 'Vista mar',
  academia: 'Academia',
  jacuzzi: 'Jacuzzi',
  lareira: 'Lareira',
  aquecimento: 'Aquecimento',
  'pet-friendly': 'Pet friendly',
}

const getAmenityIcon = (amenity: string) => {
  return amenitiesIcons[amenity] || Plus
}

const getAmenityLabel = (amenity: string) => {
  return amenitiesLabels[amenity] || amenity
}

export function Amenitie({
  amenity,
  className,
  showIcon = true,
  showLabel = false,
  labelClassName,
  iconClassName,
  ...props
}: AmenitieProps) {
  const Icon = getAmenityIcon(amenity)
  const Label = getAmenityLabel(amenity)

  return (
    <div className="flex items-center justify-center gap-2">
      {showIcon && <Icon className={cn('size-5', iconClassName)} {...props} />}
      {showLabel && <span className={labelClassName}>{Label}</span>}
    </div>
  )
}
