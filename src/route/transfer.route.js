const { Router } = require("express");
const { transferFunds } = require("../controller/transfer.controller");

const router = Router()

router.post("/", transferFunds)

module.exports = router