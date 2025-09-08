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
                city: 'São Paulo',
              },
              _limit: 5,
            }}
          />

          <PropertyReel
            title="Pra relaxar e curtir"
            subtitle="Aproveite o melhor do litoral com sua família"
            link="/s?tipo=Sítio"
            filters={{
              type: 'Sítio',
              _limit: 5,
            }}
          />

          <PropertyReel
            title="Pra caber no seu bolso"
            subtitle="Aproveite as ofertas da temporada"
            link="/s?preco_max=250"
            filters={{
              maxPrice: 250,
              _limit: 5,
            }}
          />

          <PropertyReel
            title="Pra família toda"
            subtitle="Encontre a acomodação perfeita para você e sua família"
            link="/s?hospedes=5"
            filters={{
              guests: 5,
              _limit: 5,
            }}
          />
        </div>
      </WidthWrapper>
    </main>
  )
}
