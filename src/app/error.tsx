'use client'

import { Button } from '@/components/ui/button'
import { WidthWrapper } from '@/components/width-wrapper'
import { RotateCcw } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    toast.error('Ocorreu um erro ao carregar a página')
  }, [error])

  return (
    <main className="flex h-full flex-col items-center justify-center py-24">
      <WidthWrapper>
        <div className="space-y-16">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold md:text-4xl">Algo deu errado</h1>
            <p className="text-muted-foreground text-sm">
              Recarregue a página para tentar novamente.
            </p>
            <Button onClick={reset}>
              <RotateCcw />
              Recarregar a página
            </Button>
          </div>
        </div>
      </WidthWrapper>
    </main>
  )
}
