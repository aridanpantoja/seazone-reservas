import { PropertyReel } from '@/components/property-reel'
import { WidthWrapper } from '@/components/width-wrapper'

export default async function Home() {
  return (
    <main className="py-10">
      <WidthWrapper>
        <div className="space-y-10">
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

          <PropertyReel
            title="Pra relaxar e curtir"
            subtitle="Aproveite o melhor do litoral com sua família"
            link="/s?cidade=Pra relaxar e curtir"
            filters={{
              type: 'Sítio',
            }}
          />

          <PropertyReel
            title="Pra caber no seu bolso"
            subtitle="Aproveite as ofertas da temporada"
            link="/s?maxPrice=250"
            filters={{
              maxPrice: 250,
            }}
          />
        </div>
      </WidthWrapper>
    </main>
  )
}
