const router = require("express").Router();
const {
  getBoards,
  deleteBoard,
  getsingleBoard,
} = require("../../controllers/userController");

// import middleware
const { authMiddleware } = require("../../utils/auth");

router.route("/").get(getBoards);

router
  .route("/:boardId")
  .delete(authMiddleware, deleteBoard)
  .get(getsingleBoard);

module.exports = router;
