import { knex } from "../../database";
import { FastifyRequest, FastifyReply } from "fastify";
import { loginBodySchema } from "../../schemas/user.schema";
import { BCrypt } from "../../libs/Bcrypt";

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = loginBodySchema.parse(request.body);

    const user = await knex("users").where({ email }).first();

    if (!user) return reply.status(401).send({ message: 'Credenciais inválidas' });

    const verifyPassword = await BCrypt.verifyPassword(password, user.password);

    if (!verifyPassword) return reply.status(401).send({ message: 'Credenciais inválidas' });

    const token = await reply.jwtSign({ id: user.id });

    return reply.send({ token });
};