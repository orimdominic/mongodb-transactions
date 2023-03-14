const { Router } = require("express");
const {
  transferFunds,
  getTransfers,
} = require("../controller/transfer.controller");

const router = Router();

router.post("/", transferFunds);
router.get("/", getTransfers);

module.exports = router;
