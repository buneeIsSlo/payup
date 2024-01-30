const { Router } = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.put("/", authMiddleware, userController.update_put);
router.get("/signup", userController.signup_get);
router.post("/signup", userController.signup_post);
router.post("/login", userController.login_post);

module.exports = router;