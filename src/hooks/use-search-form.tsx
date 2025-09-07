'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useState, useCallback, useMemo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { searchFormSchema, SearchFormSchema } from '@/lib/validations'

const getValuesFromParams = (
  searchParams: URLSearchParams,
): SearchFormSchema => {
  return {
    city: searchParams.get('cidade') || '',
    state: searchParams.get('estado') || '',
    guests: Number(searchParams.get('hospedes')) || 1,
    minPrice: Number(searchParams.get('preco_min')) || undefined,
    maxPrice: Number(searchParams.get('preco_max')) || undefined,
    bedrooms: Number(searchParams.get('quartos')) || undefined,
    available: searchParams.get('disponivel') === 'true',
    amenities: searchParams.get('comodidades')?.split(',') || [],
    type: searchParams.get('tipo') || '',
  }
}

export function useSearchForm() {
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const isSearchPage = pathname === '/s'

  const defaultValues = useMemo(() => {
    return isSearchPage
      ? getValuesFromParams(searchParams)
      : {
          guests: 1,
          amenities: [],
          type: '',
          minPrice: undefined,
          maxPrice: undefined,
          bedrooms: undefined,
          state: '',
          city: '',
          available: false,
        }
  }, [searchParams, isSearchPage])

  const form = useForm<SearchFormSchema>({
    resolver: zodResolver(searchFormSchema),
    defaultValues,
  })

  useEffect(() => {
    form.reset(getValuesFromParams(searchParams))
  }, [searchParams])

  const handleSearch = useCallback(
    (data: SearchFormSchema) => {
      const newSearchParams = new URLSearchParams()

      const filters: Record<string, string | number | boolean | undefined> = {
        cidade: data.city || undefined,
        estado: data.state || undefined,
        hospedes: data.guests && data.guests > 1 ? data.guests : undefined,
        preco_min: data.minPrice,
        preco_max: data.maxPrice,
        quartos: data.bedrooms,
        disponivel: data.available || undefined,
        comodidades:
          data.amenities && data.amenities.length > 0
            ? data.amenities.join(',')
            : undefined,
        tipo: data.type || undefined,
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== false) {
          newSearchParams.set(key, String(value))
        }
      })

      const newURL = `/s?${newSearchParams.toString()}`
      router.push(newURL)
      setOpen(false)
    },
    [router],
  )

  const clearFilters = useCallback(() => {
    form.reset({
      city: '',
      state: '',
      guests: 1,
      minPrice: undefined,
      maxPrice: undefined,
      bedrooms: undefined,
      available: false,
      amenities: [],
      type: '',
    })
    if (isSearchPage) {
      router.replace('/s')
    }
    setOpen(false)
  }, [form, isSearchPage, router])

  const watchedValues = form.watch()

  const hasFilters = useMemo(
    () =>
      !!(
        watchedValues.city ||
        watchedValues.state ||
        watchedValues.minPrice ||
        watchedValues.maxPrice ||
        watchedValues.bedrooms ||
        watchedValues.available ||
        (watchedValues.guests && watchedValues.guests > 1) ||
        (watchedValues.amenities && watchedValues.amenities.length > 0) ||
        watchedValues.type
      ),
    [watchedValues],
  )

  return {
    form,
    open,
    setOpen,
    handleSearch,
    clearFilters,
    hasFilters,
    isSearchPage,
    watchedValues,
  }
}
