const router = require("express").Router();
// import middleware
const { withAuth } = require("../../utils/auth");
const {
  getUsers,
  createUser,
  // getSingleUser,
  login,
  // deleteUser,
  getMe,
} = require("../../controllers/userController");

const { createBoard } = require("../../controllers/boardController");

router.route("/").get(getUsers).post(createUser);

router.route("/boards").post(createBoard);

// router.route("/:userId").get(getSingleUser).delete(deleteUser);

router.route("/me").get(getMe);

router.route("/login").post(login);

module.exports = router;
