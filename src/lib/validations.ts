import { z } from 'zod'

export const scheduleFormSchema = z.object({
  range: z.object({
    from: z.coerce
      .date()
      .min(
        new Date(),
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
