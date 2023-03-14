const express = require("express");
const usersRouter = require("./route/user.route");
const transferRouter = require("./route/transfer.route");

const app = express();

app.use(express.json());

app.get("/", (_req, res) => res.json({ ok: true }));

app.use("/users", usersRouter);

app.use("/transfers", transferRouter);

app.use((err, _req, res, next) => {
  return res.status(500).json({
    error: err.message,
    status: "error",
  });
});

module.exports = app;
