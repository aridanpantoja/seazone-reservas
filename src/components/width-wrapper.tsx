import { cn } from '@/lib/utils'

type WidthWrapperProps = {
  children: React.ReactNode
  className?: string
}

export function WidthWrapper({ children, className }: WidthWrapperProps) {
  return (
    <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
