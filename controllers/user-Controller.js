// import user model
const { User, Board } = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth");

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
  const token = signToken(user);
  res.json({ token, user });
};

// Save a board for a user
// user comes from `req.user` created in the auth middleware function
const createBoard = async (req, res) => {
  const { user, title, backgroundImage } = req.body;

  try {
    // Create a new user object
    const newBoard = new User({
      user,
      title,
      backgroundImage,
    });

    // Save the user to the database
    const savedBoard = await newBoard.save();

    res.status(201).json(savedBoard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
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
// Create a task
const createTask = async (req, res) => {
  const {
    boardId,
    title,
    description,
    dueDate,
    completed,
    priority,
    createdBy,
  } = req.body;

  try {
    // Create a new task object
    const newTask = new Task({
      board: boardId,
      title,
      description,
      dueDate,
      completed,
      priority,
      createdBy,
    });

    // Save the task to the database
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
};
// Delete a task
const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    // Find the task by its ID and delete it
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, dueDate, completed, priority } = req.body;

  try {
    // Find the task by its ID and update its fields
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        dueDate,
        completed,
        priority,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  login,
  createBoard,
  deleteBoard,
  createTask,
  deleteTask,
  updateTask,
};
