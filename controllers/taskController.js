const { Task } = require("../models");

module.exports = {
  //retrieves all tasks
  getTasks(req, res) {
    Task.find()
      .then((allTasks) => res.json(allTasks))
      .catch((err) => res.status(500).json(err));
  },

  //route for finding a single task by id
  getSingleTask(req, res) {
    Task.findOne({ _id: req.params.taskId })
      .then((singleTask) =>
        !singleTask
          ? res.status(404).json({ message: "No task with that ID" })
          : res.json(singleTask)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new  task
  createTask(req, res) {
    Task.create(req.body)
      .then((newTaskData) => res.json(newTaskData))
      .catch((err) => res.status(500).json(err));
  },
  // delete task
  deleteTask(req, res) {
    Task.findOneAndDelete({ _id: req.params.taskId })
      .then((deletedTasks) =>
        !deletedTasks
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(deletedTasks)
      )
      .catch((err) => res.status(500).json(err));
  },
  //edit or update a task
  updateTask(req, res) {
    console.log(req.body);
    Task.findOneAndUpdate(
      { _id: req.params.taskId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((tasks) =>
        !tasks
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(tasks)
      )
      .catch((err) => res.status(500).json(err));
  },
};
