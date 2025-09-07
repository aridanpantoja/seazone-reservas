import { LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type LoadingButtonProps = {
  loading?: boolean
  loadingLabel?: string
  hideIconOnLoading?: boolean
} & React.ComponentProps<typeof Button>

export function LoadingButton({
  loading = false,
  hideIconOnLoading = true,
  disabled,
  children,
  loadingLabel,
  className,
  ...props
}: LoadingButtonProps) {
  const buttonContent = loading && loadingLabel ? loadingLabel : children

  return (
    <Button
      className={cn(
        className,
        hideIconOnLoading &&
          'data-[loading=true]:[&_svg]:[&:not(.animate-spin)]:hidden',
      )}
      data-loading={loading}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoaderCircle className="animate-spin" />}
      {buttonContent}
    </Button>
  )
}
