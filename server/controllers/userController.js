const { User, Board } = require("../models");

const getMe = (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  // You can access the logged-in user's ID from req.session.userId
  User.findById(req.session.userId)
    .populate({
      path: "boards",
      populate: {
        path: "tasks",
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

const getUsers = (req, res) => {
  User.find()
    .populate("boards")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.session.userId }, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "No user with this id!" });
    }
    return res.json({ message: "user successfully updated!", user });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const createUser = async ({ body }, res) => {
  const user = await User.create(body);

  if (!user) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  res.json({ user });
};

const login = async ({ body, session }, res) => {
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

  session.userId = user.id;
  session.username = user.username;
  session.loggedIn = true;

  res.json({ user, message: "You are now logged in!" });
};

const deleteUser = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  User.findByIdAndDelete(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return Board.deleteMany({ _id: { $in: user.boards } });
    })
    .then(() => res.json({ message: "User and associated boards deleted!" }))
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  getMe,
  getUsers,
  createUser,
  deleteUser,
  login,
  updateUser,
};
