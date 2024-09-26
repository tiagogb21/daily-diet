import { z } from 'zod';

const userBodySchema = z.object({
    name: z.string().optional(), // name é uma propriedade opcional
    email: z.string().email(),
    password: z.string(),
});

export const registerBodySchema = userBodySchema.extend({
    name: z.string(), // torna "name" obrigatório para registro
});

export const loginBodySchema = userBodySchema.omit({ name: true });
