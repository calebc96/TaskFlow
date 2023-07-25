const router = require("express").Router();
const userRoutes = require("./userRoutes");
const boardRoutes = require("./boardRoutes");
const taskRoutes = require("./taskRoutes");
const categoryRoutes = require("./categoryRoutes");

router.use("/categories", categoryRoutes);
router.use("/boards", boardRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;
