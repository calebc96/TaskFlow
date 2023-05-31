const router = require("express").Router();
const {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../../controllers/taskController");

router.route("/").get(getTasks).post(createTask);

router.route("/:taskId").get(getSingleTask).put(updateTask).delete(deleteTask);

module.exports = router;
