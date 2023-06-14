const router = require("express").Router();
const {
  getBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} = require("../../controllers/taskController");

router.route("/").get(getBoards).post(createBoard);

router
  .route("/:boardId")
  .get(getSingleBoard)
  .put(updateBoard)
  .delete(deleteBoard);

module.exports = router;
