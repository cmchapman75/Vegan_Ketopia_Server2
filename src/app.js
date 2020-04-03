require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { NODE_ENV } = require("./config");
const errorHandler = require("./middleware/error-handler");
const recipeRouter = require("./recipe/recipes-router");
const pantryRouter = require("./pantry/pantry-router");
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");
const listRouter = require("./shoppinglist/shoppinglist-router");
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

const app = express();

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/pantry", pantryRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/shoppinglist", listRouter);



app.use(errorHandler);


app.get("/", (req, res, next) => {
  res.send("Hello, boilerplate!");
});





module.exports = app;
