const router = require("express").Router();
const userRoutes = require("./userRoutes");
const boardRoutes = require("./boardRoutes");

router.use("/boards", boardRoutes);
router.use("/users", userRoutes);

module.exports = router;
