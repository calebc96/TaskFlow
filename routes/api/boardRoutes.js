const router = require("express").Router();
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

module.exports = router;
