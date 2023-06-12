const router = require("express").Router();
const taskRoutes = require("./taskRoutes");
const boardRoutes = require("./boardRoutes");

router.use("/tasks", taskRoutes);
router.use("./boards", boardRoutes);

module.exports = router;
