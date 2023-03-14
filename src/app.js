const express = require("express");
const usersRouter = require("./route/user.route")

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true }));
app.use("/users", usersRouter)

module.exports = app;
