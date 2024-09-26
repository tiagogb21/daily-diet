import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../database";

export const getUserMealInfo = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { id: userId } = request.user;
    const { id: mealId } = request.params;

    const totalMeals = await knex("meals")
        .select()
        .where({ user_id: userId })
        .count({ count: "*" });

    const totalInDiet = await knex("meals")
        .select()
        .where({ is_in_diet: true, user_id: userId })
        .count({ count: "*" });

    const totalOutDiet = await knex("meals")
        .select()
        .where({ is_in_diet: false, user_id: userId })
        .count({ count: "*" });

    const bestSequenceResult = await knex.raw(
        `
            SELECT MAX(sequence) as best_sequence FROM (
                SELECT COUNT(*) as sequence
                FROM (
                    SELECT date_time,
                           ROW_NUMBER() OVER (ORDER BY date_time) -
                           ROW_NUMBER() OVER (PARTITION BY DATE(date_time) ORDER BY date_time) as grp
                    FROM meals
                    WHERE user_id = ? AND is_in_diet = true
                ) AS sub
                GROUP BY grp
            ) AS seq
        `,
        [userId]
    );

    const bestSequence = bestSequenceResult[0][0]?.best_sequence || 0;

    return reply.status(200).send({
        totalMeals: totalMeals[0].count,
        totalInDiet: totalInDiet[0].count,
        totalOutDiet: totalOutDiet[0].count,
        bestSequence,
    });
};
