const { Task, Board } = require("../models");

const getTasks = (req, res) => {
  Task.find()
    // .populate("User") // Populate the tasks field
    .then(async (tasks) => {
      return res.json(tasks);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

const getsingleTask = (req, res) => {
  Task.findOne({ _id: req.params.taskId })
    .select("-__v")
    .then(async (task) =>
      !task
        ? res.status(404).json({ message: "No Board with that ID" })
        : res.json({
            task,
          })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

const createTask = async (req, res) => {
  Task.create(req.body)
    .then((task) => {
      return Board.findOneAndUpdate(
        { _id: req.body.board_id },
        { $addToSet: { tasks: task._id } },
        { new: true }
      );
    })
    .then((board) =>
      !board
        ? res.status(404).json({
            message: "task created, but found no board with that ID",
          })
        : res.json("Created task 🎉")
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndRemove({ _id: req.params.taskId });
    if (!task) {
      return res.status(404).json({ message: "No task with this id!" });
    }

    const tasks = await Board.findOneAndUpdate(
      { tasks: req.params.taskId },
      { $pull: { tasks: req.params.taskId } },
      { new: true }
    );
    if (!tasks) {
      return res.status(404).json({
        message: "task deleted, but no board with this id!",
      });
    }

    return res.json({ message: "Task successfully deleted!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getsingleTask,
  getTasks,
  createTask,
  deleteTask,
};
