import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("meals", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("description").notNullable();
        table.string("date_time").notNullable().defaultTo(knex.fn.now());
        table.boolean("is_in_diet").notNullable().defaultTo(false);
        table
            .integer("user_id")
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("meals");
}
