const router = require("express").Router();
const taskRoutes = require("./taskRoutes");

router.use("/tasks", taskRoutes);

module.exports = router;
