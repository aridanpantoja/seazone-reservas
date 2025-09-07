import { Skeleton } from '@/components/ui/skeleton'
import { WidthWrapper } from '@/components/width-wrapper'

export default function Loading() {
  return (
    <main className="py-10">
      <WidthWrapper>
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-10 w-full sm:w-1/3" />
            <Skeleton className="h-10 w-2/3 sm:w-1/4" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="h-64 w-full sm:h-80" />
            ))}
          </div>
        </div>
      </WidthWrapper>
    </main>
  )
}
