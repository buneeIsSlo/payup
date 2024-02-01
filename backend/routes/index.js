const { Router } = require("express");
const userRouter = require("./userRoute");
const accountRouter = require("./accountRoute");

const router = Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;