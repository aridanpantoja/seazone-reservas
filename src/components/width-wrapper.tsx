import { cn } from '@/lib/utils'

type WidthWrapperProps = {
  children: React.ReactNode
  className?: string
}

export function WidthWrapper({ children, className }: WidthWrapperProps) {
  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8 2xl:px-24', className)}>
      {children}
    </div>
  )
}
