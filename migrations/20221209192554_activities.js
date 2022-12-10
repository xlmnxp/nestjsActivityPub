/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("actvities", table => {
    table.uuid("aid").primary().defaultTo(knex.raw("gen_random_uuid()")).nullable();
    table.string("id").unique().notNullable();
    table.string("type").notNullable();
    table.json("payload").defaultTo({}).nullable();

    return table;
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return null;
};
