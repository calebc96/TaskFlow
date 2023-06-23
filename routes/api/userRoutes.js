const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  createBoard,
  deleteBoard,
  login,
  createTask,
  deleteTask,
  updateTask,
} = require("../../controllers/user-Controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

router.route("/").get(getUsers).post(createUser);

router.route("/login").post(login);
router.route("/create").post(createBoard);
router.route("/:userId").get(getSingleUser);

router.route("/boards/:boardId").delete(authMiddleware, deleteBoard);

// Create a task
router.route("/boards/:boardId/tasks").post(authMiddleware, createTask);

// Delete a task
router
  .route("/boards/:boardId/tasks/:taskId")
  .delete(authMiddleware, deleteTask);

// Update a task
router.route("/boards/:boardId/tasks/:taskId").put(authMiddleware, updateTask);

module.exports = router;
