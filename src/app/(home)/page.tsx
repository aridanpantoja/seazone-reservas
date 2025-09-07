import { PropertyReel } from '@/components/property-reel'
import { WidthWrapper } from '@/components/width-wrapper'

export default async function Home() {
  return (
    <main className="py-10">
      <WidthWrapper>
        <PropertyReel
          title="Acomodações"
          subtitle="Encontre a acomodação perfeita para você"
        />
      </WidthWrapper>
    </main>
  )
}
