const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  createBoard,
  login,
} = require("../../controllers/user-Controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

router.route("/").get(getUsers).post(createUser);

router.route("/login").post(login);
router.route("/:userId").get(getSingleUser);

module.exports = router;
