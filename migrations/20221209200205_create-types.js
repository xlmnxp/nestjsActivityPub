/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    let types = [
        "Article",
        "Document",
        "Audio",
        "Image",
        "Video",
        "Note",
        "Page",
        "Event",
        "Place",
        "Mention",
        "Profile",
        "Tombstone"
    ];

    return knex("types").insert(types.map(type => ({
        type
    })));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return null;
};
