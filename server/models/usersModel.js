const db = require("../data/dbConfig");

function getUsers() {
    return db("users");
}

module.exports = { getUsers };
