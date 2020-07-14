const express = require("express");
const cors = require("cors");

const { cognitoMiddleware } = require("./middleware/cognitoAuth");
const usersRouter = require("./routers/usersRouter");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors);
app.use(express.json());

app.use("/users", cognitoMiddleware, usersRouter);

app.get("/", (req, res) => {
    res.send("<h1>Hello from the server side!</h1>");
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
