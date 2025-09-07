'use client'

import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useState } from 'react'

export function ShareButton() {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      toast.success('URL copiada para a área de transferência')
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    } catch (error) {
      toast.error('Erro ao copiar URL')
    }
  }

  return (
    <Button variant="outline" onClick={handleShare} aria-label="Compartilhar">
      <Share2 />
      {copied ? 'Copiado' : 'Compartilhar'}
    </Button>
  )
}
