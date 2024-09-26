import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../database";

export const deleteMeal = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { id: userId } = request.user;
    const { id: mealId } = request.params;

    const result = await knex("meals")
        .where({ id: mealId, user_id: userId })
        .delete();

    if (result === 0) {
        return reply.status(404).send({ message: "Meal not found" });
    }

    return reply.status(200).send();
};
