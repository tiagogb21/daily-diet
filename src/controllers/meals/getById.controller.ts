import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../database";

export const getMealById = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { id: userId } = request.user;
    const { id: mealId } = request.params;

    const result = await knex("meals")
        .select()
        .where({ id: mealId ,user_id: userId })
        .first();

    if (result.length === 0) {
        return reply.status(404).send({ message: "Meal not found" });
    }

    return reply.status(200).send(result);
};