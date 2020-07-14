exports.seed = function (knex) {
    return knex("users").insert(
        [
            { email: "testuser1@test.com" },
            { email: "testuser2@test.com" },
            { email: "testuser3@test.com" },
            { email: "testuser4@test.com" },
        ],
        "id"
    );
};
