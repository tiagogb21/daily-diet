import { z } from 'zod';

export const mealsBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    date_time: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    is_in_diet: z.boolean(),
});

export const updateMealsBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    date_time: z
        .string()
        .refine((val) => (val ? !isNaN(Date.parse(val)) : true), {
            message: "Invalid date format",
        })
        .optional(),
    is_in_diet: z.boolean().optional(),
}).refine(
    (data) =>
        data.name !== undefined ||
        data.description !== undefined ||
        data.date_time !== undefined ||
        data.is_in_diet !== undefined,
    {
        message: "At least one field must be provided for update",
    }
);
