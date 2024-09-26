import { knex } from "../../database";
import { FastifyRequest, FastifyReply } from "fastify";
import { registerBodySchema } from "../../schemas/user.schema";
import { BCrypt } from "../../libs/Bcrypt";

export const register = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { name, email, password } = registerBodySchema.parse(request.body);

    const hashedPassword = await BCrypt.hashPassword(password);

    const userExists = await knex("users").where({email}).first();

    if(userExists) {
        return reply.code(400).send({message: "User already exists"});
    }

    await knex("users").insert({
        name,
        email,
        password: hashedPassword,
    });

    return reply.status(201).send();
};
