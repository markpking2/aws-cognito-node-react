exports.up = function (knex) {
    return knex.schema.createTable("users", (tbl) => {
        tbl.increments();
        tbl.varchar("email", 255).notNullable().unique();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
};
