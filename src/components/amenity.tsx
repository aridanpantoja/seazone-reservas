import { cn } from '../lib/utils'
import type { LucideProps, LucideIcon } from 'lucide-react'
import {
  Wifi,
  Tv,
  Car,
  CookingPot,
  WashingMachine,
  Snowflake,
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
import React from 'react'
import { AmenityType } from '@/types/amenities.type'

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
