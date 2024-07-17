import * as z from 'zod';

export const IncomeValidation = z.object({
    amount: z.number().positive(),
    source: z.string().min(1, {message: 'Minimum 1 character'}).max(30),
    username: z.string().min(1, {message: 'Minimum 1 character'}).max(30),
    description: z.string()
})