import { PropertyReel } from '@/components/property-reel'
import { buttonVariants } from '@/components/ui/button'
import { WidthWrapper } from '@/components/width-wrapper'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center py-24">
      <WidthWrapper>
        <div className="space-y-16">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold md:text-4xl">
              Página não encontrada
            </h1>
            <p className="text-muted-foreground text-sm">
              A página que você está procurando não existe ou foi removida.
            </p>
            <Link href="/" className={buttonVariants()}>
              <ArrowLeft /> Voltar para a home
            </Link>
          </div>

          <PropertyReel title="Talvez você esteja procurando por..." />
        </div>
      </WidthWrapper>
    </main>
  )
}
