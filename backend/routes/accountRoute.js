const express = require("express");
const accountController = require("../controllers/accountController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/balance", authMiddleware, accountController.balance_get);
router.post("/transfer", authMiddleware, accountController.transfer);

module.exports = router;