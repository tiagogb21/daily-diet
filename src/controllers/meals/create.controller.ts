import { FastifyReply, FastifyRequest } from "fastify";
import { mealsBodySchema } from "../../schemas/meal.schema";
import { knex } from "../../database";

export const createMeal = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { id: userId } = request.user;

    const { name, description, date_time, is_in_diet } = mealsBodySchema.parse(
        request.body
    );

    await knex("meals").insert({
        name,
        description,
        date_time,
        is_in_diet,
        user_id: userId,
    });

    return reply.status(201).send();
};
