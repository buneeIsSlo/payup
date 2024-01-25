const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

router.get("/signup", userController.signup_get);

module.exports = router;