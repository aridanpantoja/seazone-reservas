import { z } from 'zod'

export const scheduleFormSchema = z.object({
  range: z.object({
    from: z.coerce
      .date()
      .min(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        'A data de check-in deve ser maior ou igual que a data atual',
      ),
    to: z.coerce
      .date()
      .min(
        new Date(),
        'A data de check-out deve ser maior ou igual que a data atual',
      ),
  }),
  guests: z.object({
    adults: z.coerce
      .number()
      .min(1, 'O número de adultos deve ser maior ou igual a 1'),
    children: z.coerce
      .number()
      .min(0, 'O número de crianças deve ser maior ou igual a 0'),
  }),
})

export type ScheduleFormSchema = z.infer<typeof scheduleFormSchema>

export const searchFormSchema = z
  .object({
    city: z
      .string()
      .max(40, 'A cidade deve ter no máximo 40 caracteres.')
      .optional(),
    state: z
      .string()
      .max(2, 'O estado deve ter no máximo 2 caracteres.')
      .optional(),
    guests: z.coerce
      .number()
      .min(1, 'O número de hóspedes deve ser no mínimo 1.')
      .optional(),
    minPrice: z.coerce
      .number()
      .positive('O preço mínimo deve ser positivo.')
      .optional(),
    amenities: z.array(z.string()).optional(),
    maxPrice: z.coerce
      .number()
      .positive('O preço máximo deve ser positivo.')
      .optional(),
    bedrooms: z.coerce
      .number()
      .positive('O número de quartos deve ser positivo.')
      .optional(),
    available: z.boolean().optional(),
    type: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.minPrice && data.maxPrice) {
        return data.minPrice <= data.maxPrice
      }
      return true
    },
    {
      message: 'O preço mínimo não pode ser maior que o preço máximo.',
      path: ['minPrice'],
    },
  )

export type SearchFormSchema = z.infer<typeof searchFormSchema>
