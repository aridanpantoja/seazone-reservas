'use client'

import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function ShareButton() {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('URL copiada para a área de transferência')
  }

  return (
    <Button variant="outline" onClick={handleShare} aria-label="Compartilhar">
      <Share2 />
      Compartilhar
    </Button>
  )
}
