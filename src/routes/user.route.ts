import { FastifyInstance } from "fastify";
import { register } from "../controllers/user/register.controller";
import { login } from "../controllers/user/login.controller";

export async function usersRoutes(app: FastifyInstance) {
    app.post("/register", register);
    app.post("/login", login)
}
