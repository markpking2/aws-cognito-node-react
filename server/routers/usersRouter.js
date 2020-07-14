const router = require("express").Router();
const { getUsers } = require("../models/usersModel");

router.get("/", async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).send(users);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving users.");
    }
});

module.exports = router;
