'use client'

import { BRAZIL_STATES } from '@/constants/states'
import { useSearchForm } from '@/hooks/use-search-form'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { Amenity } from '@/components/amenity'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SearchForm({
  className,
  expanded,
}: {
  className?: string
  expanded?: boolean
}) {
  const {
    form,
    open,
    setOpen,
    handleSearch,
    clearFilters,
    hasFilters,
    isSearchPage,
    watchedValues,
  } = useSearchForm()

  const { city, state, guests } = watchedValues

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="rounded-full">
          <div>
            <div
              className={cn(
                'border-input text-muted-foreground bg-background hover:border-primary/40 data-[has-filters=true]:border-primary/40 data-[has-filters=true]:text-foreground hidden h-full items-center gap-4 rounded-full border p-2 py-1 pr-1.5 pl-4 text-sm transition-all hover:cursor-pointer hover:shadow-xs data-[expanded=true]:p-2 data-[expanded=true]:pl-6 lg:flex',
                className,
              )}
              data-has-filters={hasFilters}
              data-expanded={expanded}
            >
              <span>{city || state || 'Qualquer lugar'}</span>
              <div className="bg-muted h-[20px] w-[1px]"></div>
              <span>
                {guests && guests > 1 ? `${guests} hóspedes` : 'Hóspedes?'}
              </span>
              <div className="bg-muted h-[20px] w-[1px]"></div>
              <span>Pesquisar</span>
              <div
                className={buttonVariants({
                  size: 'icon',
                  className: '!rounded-full',
                })}
              >
                <Search />
              </div>
            </div>
            <div
              className={buttonVariants({
                size: 'icon',
                className: '!rounded-full lg:hidden',
              })}
            >
              <Search />
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="w-full max-w-md gap-0 p-0">
          <DialogHeader className="border-b p-4">
            <DialogTitle>Pesquisar</DialogTitle>
            <DialogDescription>
              Pesquise por cidade, estado, hóspedes, preço e mais.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSearch)}
              className="grid max-h-[500px] grid-cols-1 gap-4 overflow-y-auto p-4 sm:grid-cols-2"
            >
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Florianópolis"
                        maxLength={40}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um estado" />
                      </SelectTrigger>
                      <FormControl>
                        <SelectContent>
                          {BRAZIL_STATES.map((state) => (
                            <SelectItem key={state.sigla} value={state.sigla}>
                              {state.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hóspedes</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quartos</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Mínimo de quartos"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço Mín.</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="R$ 100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço Máx.</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="R$ 500"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || undefined)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Tipo</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                      <FormControl>
                        <SelectContent>
                          {[
                            'Apartamento',
                            'Casa',
                            'Studio',
                            'Cobertura',
                            'Chalé',
                            'Loft',
                            'Sítio',
                          ].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenities"
                render={() => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Comodidades</FormLabel>
                    {[
                      'wifi',
                      'ar-condicionado',
                      'garagem',
                      'cozinha-equipada',
                      'smart-tv',
                      'lavadora',
                      'piscina',
                      'churrasqueira',
                      'varanda',
                      'vista-mar',
                      'academia',
                      'jacuzzi',
                      'lareira',
                      'aquecimento',
                      'pet-friendly',
                    ].map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="amenities"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex flex-row items-center gap-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...(field.value || []),
                                          item,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item,
                                          ),
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                <Amenity
                                  amenity={item}
                                  showIcon={false}
                                  showLabel
                                />
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 sm:col-span-2 sm:rounded-md sm:border sm:p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div>
                      <FormLabel>Apenas acomodações disponíveis</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex gap-2 sm:col-span-2">
                <Button
                  type="button"
                  onClick={clearFilters}
                  variant="outline"
                  className="flex-1"
                  disabled={!hasFilters}
                >
                  Limpar
                </Button>

                <Button type="submit" className="flex-1">
                  <Search className="mr-2 h-4 w-4" />
                  {isSearchPage ? 'Atualizar' : 'Pesquisar'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
