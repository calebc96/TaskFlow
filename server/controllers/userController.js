// import user model
const { User, Board } = require("../models");

const { signToken } = require("../utils/auth");

//finding the user based on the token
const getMe = (req, res) => {
  User.findOne({ token: req.token })
    .populate("boards") // Populate the boards field
    .then(async (users) => {
      return res.json(users);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// Get all Users
const getUsers = (req, res) => {
  User.find()
    .populate("boards") // Populate the boards field
    .then(async (users) => {
      return res.json(users);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// Get a single User
const getSingleUser = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .populate("boards")
    .select("-__v")
    .then(async (user) =>
      !user
        ? res.status(404).json({ message: "No User with that ID" })
        : res.json({
            user,
          })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// Create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
const createUser = async ({ body }, res) => {
  const user = await User.create(body);

  if (!user) {
    return res.status(400).json({ message: "Something is wrong!" });
  }
  const token = signToken(user);
  res.json({ token, user });
};

// Login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
// { body } is destructured req.body
const login = async ({ body }, res) => {
  const user = await User.findOne({
    $or: [{ username: body.username }, { email: body.email }],
  });

  if (!user) {
    return res.status(400).json({ message: "Can't find this user" });
  }

  const correctPw = await user.isCorrectPassword(body.password);

  if (!correctPw) {
    return res.status(400).json({ message: "Wrong password!" });
  }
  const token = signToken(user);
  res.json({ token, user });
};

const deleteUser = async (req, res) => {
  User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : Board.deleteMany({ _id: { $in: user.boards } })
    )
    .then(() => res.json({ message: "User and associated boards deleted!" }))
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  getMe,
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  login,
};
