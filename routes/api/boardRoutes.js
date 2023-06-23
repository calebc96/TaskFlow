const router = require("express").Router();
const { get } = require("mongoose");
const {
  getBoards,
  createBoard,
  deleteBoard,
  getsingleBoard,
} = require("../../controllers/user-Controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

router.route("/").post(createBoard).get(getBoards);

router
  .route("/:boardId")
  .delete(authMiddleware, deleteBoard)
  .get(getsingleBoard);

// Create a task
// router.route("/boards/:boardId/tasks").post(authMiddleware, createTask);

// Delete a task
// router
//   .route("/boards/:boardId/tasks/:taskId")
//   .delete(authMiddleware, deleteTask);

// Update a task
// router.route("/boards/:boardId/tasks/:taskId").put(authMiddleware, updateTask);

module.exports = router;
