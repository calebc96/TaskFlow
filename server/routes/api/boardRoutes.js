const router = require("express").Router();
const {
  getBoards,
  deleteBoard,
  getsingleBoard,
  createBoard,
} = require("../../controllers/boardController");

// import middleware
const { authMiddleware } = require("../../utils/auth");

router.route("/").get(getBoards).post(createBoard);

router.route("/:boardId").delete(deleteBoard).get(getsingleBoard);

module.exports = router;
