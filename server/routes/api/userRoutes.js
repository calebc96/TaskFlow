const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  login,
  deleteUser,
  getMe,
} = require("../../controllers/userController");

const { createBoard } = require("../../controllers/boardController");

// import middleware
const { authMiddleware } = require("../../utils/auth");

router.route("/").get(getUsers).post(createUser);

router.route("/boards").post(createBoard);

router.route("/:userId").get(getSingleUser).delete(deleteUser);

router.route("/me").get(authMiddleware, getMe);

router.route("/login").post(login);

module.exports = router;
