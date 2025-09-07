import { cn } from '@/lib/utils'

type WidthWrapperProps = {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export function WidthWrapper({
  children,
  className,
  ...props
}: WidthWrapperProps) {
  return (
    <div
      className={cn('mx-auto px-4 sm:px-6 lg:px-8 2xl:px-24', className)}
      {...props}
    >
      {children}
    </div>
  )
}
