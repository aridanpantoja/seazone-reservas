import { z } from 'zod'

export const scheduleFormSchema = z
  .object({
    range: z.object({
      from: z.date({
        required_error: 'A data de check-in é obrigatória.',
      }),
      to: z.date({
        required_error: 'A data de check-out é obrigatória.',
      }),
    }),
    guests: z.coerce
      .number()
      .min(1, 'O número de hóspedes deve ser maior ou igual a 1'),
  })
  .refine(
    (data) => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return data.range.from >= today
    },
    {
      message: 'A data de check-in não pode ser no passado.',
      path: ['range', 'from'],
    },
  )
  .refine(
    (data) => {
      return data.range.to > data.range.from
    },
    {
      message: 'A data de check-out deve ser posterior à de check-in.',
      path: ['range', 'to'],
    },
  )

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
