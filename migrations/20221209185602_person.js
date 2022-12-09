/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("person", table => {
    table.uuid("pid").primary().defaultTo(knex.raw("gen_random_uuid()")).nullable();
    table.string("id").unique().notNullable();
    table.string("name").notNullable();
    table.string("preferredUsername").notNullable();
    table.string("summary");
    table.string("inbox");
    table.string("outbox");
    table.string("followers");
    table.string("following");
    table.string("liked")
    return table;
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return null;
};
