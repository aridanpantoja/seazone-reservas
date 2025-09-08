import { PropertyReel } from '@/components/property-reel'
import { WidthWrapper } from '@/components/width-wrapper'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Descubra as melhores acomodações para sua viagem',
}

export default function Home() {
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
            }}
          />

          <PropertyReel
            title="Pra relaxar e curtir"
            subtitle="Aproveite o melhor do litoral com sua família"
            link="/s?tipo=Sítio"
            filters={{
              type: 'Sítio',
            }}
          />

          <PropertyReel
            title="Pra caber no seu bolso"
            subtitle="Aproveite as ofertas da temporada"
            link="/s?preco_max=250"
            filters={{
              maxPrice: 250,
            }}
          />

          <PropertyReel
            title="Pra família toda"
            subtitle="Encontre a acomodação perfeita para você e sua família"
            link="/s?hospedes=8"
            filters={{
              guests: 8,
            }}
          />
        </div>
      </WidthWrapper>
    </main>
  )
}
