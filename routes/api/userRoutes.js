const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  login,
  createBoard,
} = require("../../controllers/userController");

// import middleware
const { authMiddleware } = require("../../utils/auth");

router.route("/").get(getUsers).post(createUser);

router.route("/boards").post(createBoard);

router.route("/login").post(login);
router.route("/:userId").get(getSingleUser);

module.exports = router;
