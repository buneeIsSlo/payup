const { Router } = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.put("/update", authMiddleware, userController.update_put);
router.get("/auth-info", authMiddleware, userController.auth_get);
router.post("/signup", userController.signup_post);
router.post("/login", userController.login_post);
router.get("/logout", userController.logout_get);
router.get("/bulk", authMiddleware, userController.bulk_get);

module.exports = router;