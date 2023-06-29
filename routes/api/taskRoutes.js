const router = require("express").Router();
const {
  getTasks,
  getsingleTask,
  createTask,
  deleteTask,
} = require("../../controllers/taskController");

router.route("/").get(getTasks).post(createTask);

router.route("/:taskId").delete(deleteTask).get(getsingleTask);

module.exports = router;
