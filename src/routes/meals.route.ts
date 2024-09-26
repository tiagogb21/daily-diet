import { FastifyInstance } from "fastify";
import { createMeal } from "../controllers/meals/create.controller";
import { updateMeal } from "../controllers/meals/update.controller";
import { getAllMeals } from "../controllers/meals/getAll.controller";
import { getMealById } from "../controllers/meals/getById.controller";
import { deleteMeal } from "../controllers/meals/delete.controller";
import { getUserMealInfo } from "../controllers/meals/getUserMealInfo.controller";

export async function mealsRoutes(app: FastifyInstance) {
    app.post("/", {
        preValidation: [app.authenticate]
    }, createMeal);
    app.get("/", {
        preValidation: [app.authenticate]
    }, getAllMeals);
    app.get("/:id", {
        preValidation: [app.authenticate]
    }, getMealById);
    app.put("/update/:id", {
        preValidation: [app.authenticate]
    }, updateMeal);
    app.delete("/delete/:id", {
        preValidation: [app.authenticate]
    }, deleteMeal);
    app.get("/info", {
        preValidation: [app.authenticate]
    }, getUserMealInfo);
}
