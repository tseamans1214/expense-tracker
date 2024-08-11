import * as z from 'zod';

export const OneTimePaymentValidation = z.object({
    userId: z.string(),
    amount: z.any(),
    source: z.string().min(1, {message: 'Minimum 1 character'}).max(15),
    date: z.string(),
})