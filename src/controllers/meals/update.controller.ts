import { FastifyReply, FastifyRequest } from "fastify";
import { updateMealsBodySchema } from "../../schemas/meal.schema";
import { knex } from "../../database";

export const updateMeal = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { id: userId } = request.user;
    const { id: mealId } = request.params;

    const updateData = updateMealsBodySchema.parse(request.body);

    if (Object.keys(updateData).length === 0) {
        return reply.status(400).send({ message: "No valid fields to update" });
    }

    const result = await knex("meals")
        .where({ id: mealId, user_id: userId })
        .update(updateData);

    if (!result) {
        return reply.status(404).send({ message: "Meal not found" });
    }

    return reply.status(200).send();
};
