const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable("users", async table => {
        let salt = bcrypt.genSaltSync();
        let password = bcrypt.hashSync(v4(), salt);
        table.string("password").notNullable().defaultTo(password);
        table.string("salt").notNullable().defaultTo(salt);
        return table;
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return null;
};
