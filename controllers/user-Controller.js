// import user model
const { User } = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth");

// Get all Users
const getUsers = (req, res) => {
  User.find()
    .then(async (Users) => {
      const userObj = {
        Users,
      };
      return res.json(userObj);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// Get a single User
const getSingleUser = (req, res) => {
  User.findOne({ _id: req.params.userId })
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
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Create a new user object
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
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

// Save a board for a user
// user comes from `req.user` created in the auth middleware function
const saveBoard = async ({ user, body }, res) => {
  console.log(user);
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $addToSet: { savedBoards: body } },
      { new: true, runValidators: true }
    );
    return res.json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

// Remove a board from `savedBoards`
const deleteBoard = async ({ user, params }, res) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { $pull: { savedBoards: { boardId: params.bookId } } },
    { new: true }
  );
  if (!updatedUser) {
    return res
      .status(404)
      .json({ message: "Couldn't find user with this id!" });
  }
  return res.json(updatedUser);
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  login,
  saveBoard,
  deleteBoard,
};
