const {Router} = require("express");
const userRouter = require("./userRoute");

const router = Router();

router.use("/user", userRouter);

module.exports = router;