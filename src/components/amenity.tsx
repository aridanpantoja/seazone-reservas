import { AmenityType } from '@/types/amenities.type'
import type { LucideIcon } from 'lucide-react'
import {
  Bath,
  Car,
  Cat,
  CookingPot,
  Dumbbell,
  Flame,
  FlameKindling,
  Heater,
  Hotel,
  Plus,
  Snowflake,
  Sun,
  Tv,
  WashingMachine,
  WavesLadder,
  Wifi,
} from 'lucide-react'
import React from 'react'
import { cn } from '../lib/utils'

type AmenityProps = {
  amenity: AmenityType | string
  showIcon?: boolean
  showLabel?: boolean
  labelClassName?: string
  iconClassName?: string
} & React.HTMLAttributes<HTMLDivElement>

const amenitiesMap: Record<AmenityType, { icon: LucideIcon; label: string }> = {
  wifi: { icon: Wifi, label: 'Wifi' },
  'ar-condicionado': { icon: Snowflake, label: 'Ar condicionado' },
  garagem: { icon: Car, label: 'Garagem' },
  'cozinha-equipada': { icon: CookingPot, label: 'Cozinha equipada' },
  'smart-tv': { icon: Tv, label: 'Smart TV' },
  lavadora: { icon: WashingMachine, label: 'Lavadora' },
  piscina: { icon: WavesLadder, label: 'Piscina' },
  churrasqueira: { icon: Flame, label: 'Churrasqueira' },
  varanda: { icon: Hotel, label: 'Varanda' },
  'vista-mar': { icon: Sun, label: 'Vista mar' },
  academia: { icon: Dumbbell, label: 'Academia' },
  jacuzzi: { icon: Bath, label: 'Jacuzzi' },
  lareira: { icon: FlameKindling, label: 'Lareira' },
  aquecimento: { icon: Heater, label: 'Aquecimento' },
  'pet-friendly': { icon: Cat, label: 'Pet friendly' },
}

export function Amenity({
  amenity,
  showIcon = true,
  showLabel = false,
  labelClassName,
  iconClassName,
  className,
  ...props
}: AmenityProps) {
  const { icon: Icon, label } = amenitiesMap[amenity as AmenityType] || {
    icon: Plus,
    label: 'Comodidade',
  }

  return (
    <div
      className={cn('flex items-center justify-center gap-2', className)}
      {...props}
    >
      {showIcon && <Icon className={cn('size-5', iconClassName)} />}
      {showLabel && <span className={labelClassName}>{label}</span>}
    </div>
  )
}
