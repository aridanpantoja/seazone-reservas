import { WidthWrapper } from '@/components/width-wrapper'

export default function AccommodationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="py-10">
      <WidthWrapper className="max-w-screen-xl">{children}</WidthWrapper>
    </main>
  )
}
