import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../database";

export const getAllMeals = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { id: userId } = request.user;
    const { id: mealId } = request.params;

    const result = await knex("meals")
        .select()
        .where({ user_id: userId });

    if (result.length === 0) {
        return reply.status(404).send({ message: "Meal not found" });
    }

    return reply.status(200).send(result);
};
