import { Skeleton } from '@/components/ui/skeleton'

export default function AccommodationLoading() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-10 w-1/2" />

        <div className="flex items-center justify-center gap-2">
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <Skeleton className="h-[300px] w-full md:h-[500px]" />

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 space-y-6">
          <Skeleton className="h-10 w-full" />

          <Skeleton className="h-10 w-2/3" />

          <Skeleton className="h-48 w-full" />
        </div>

        <Skeleton className="h-80 w-80" />
      </div>
    </section>
  )
}
