// import user model
const { User, Board } = require("../models");

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
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  login,
};
