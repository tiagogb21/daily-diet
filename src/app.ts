import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";

import { usersRoutes } from "./routes/user.route";
import { env } from "./env";
import { mealsRoutes } from "./routes/meals.route";

export const app = fastify();

app.register(cookie);

app.register(usersRoutes, {
    prefix: "user",
});

app.register(mealsRoutes, {
    prefix: "meals",
});

app.register(jwt, {
    secret: env.SECRET_KEY,
    sign: {
        expiresIn: "1h",
    },
});

app.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    }
);
