import { PropertyReel } from '@/components/property-reel'
import { WidthWrapper } from '@/components/width-wrapper'

export default async function Home() {
  return (
    <main className="py-10">
      <div className="space-y-10">
        <WidthWrapper>
          <PropertyReel
            title="Acomodações em São Paulo"
            subtitle="Encontre a acomodação perfeita para você"
            link="/s?cidade=São Paulo"
            filters={{
              location: {
                state: 'SP',
              },
            }}
          />
        </WidthWrapper>

        <WidthWrapper>
          <PropertyReel
            title="Pra relaxar e curtir"
            subtitle="Aproveite o melhor do litoral com sua família"
            link="/s?cidade=Pra relaxar e curtir"
            filters={{
              location: {
                state: 'CE',
              },
            }}
          />
        </WidthWrapper>
      </div>
    </main>
  )
}
