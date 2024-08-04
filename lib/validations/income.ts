import * as z from 'zod';

export const IncomeValidation = z.object({
    userId: z.string(),
    amount: z.any(),
    source: z.string().min(1, {message: 'Minimum 1 character'}).max(15),
    description: z.string().max(15),
})