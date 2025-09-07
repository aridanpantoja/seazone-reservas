import { WidthWrapper } from '@/components/width-wrapper'

export default function AccommodationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="py-10">
        <WidthWrapper className="max-w-screen-xl">{children}</WidthWrapper>
      </div>
    </div>
  )
}
