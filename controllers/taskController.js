const { Task } = require("../models");

module.exports = {
  getTasks(req, res) {
    Task.find()
      .then((tasks) => res.json(tasks))
      .catch((err) => res.status(500).json(err));
  },
  getSingleTask(req, res) {
    Task.findOne()({ _id: req.params.taskId })
      .then((task) =>
        !task
          ? res.status(404).json({ message: "No task with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new  task
  createTask(req, res) {
    Task.create(req.body)
      .then((dbTaskData) => res.json(dbTaskData))
      .catch((err) => res.status(500).json(err));
  },
  // delet task
  deleteTask(req, res) {
    Task.findOneAndDelete({ _id: req.params.taskId })
      .then((task) =>
        !task
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //edit or update a task
  updatetask(req, res) {
    Task.findOneAndUpdate({ _id: req.params.taskId })
      .then((task) =>
        !task
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
