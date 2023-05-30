const router = require("express").Router();
const {
  getTasks,
  getSingleTask,
  createTask,
  deleteTask,
} = require("../../controllers/taskController");

router.route("/").get(getTasks).post(createTask);

router.route("/:taskId").get(getSingleTask).delete(deleteTask);

module.exports = router;
