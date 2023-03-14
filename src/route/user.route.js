const { Router } = require("express");
const { getUsers } = require("../controller/user.controller");

const router = Router()

router.get("/", getUsers)

module.exports = router