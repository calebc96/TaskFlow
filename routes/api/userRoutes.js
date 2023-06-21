const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  createBoard,
  deleteBoard,
  login,
} = require("../../controllers/user-Controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of user
router.route("/").get(getUsers).post(createUser);

router.route("/login").post(login);
router.route("/create").post(createBoard);
router.route("/:userId").get(getSingleUser);

// router.route("/:userId").get(authMiddleware, getSingleUser);

router.route("/boards/:boardId").delete(authMiddleware, deleteBoard);

module.exports = router;
