const express = require("express");
const cors = require("cors");

const { cognitoMiddleware } = require("./middleware/cognitoAuth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors);
app.use(express.json());
