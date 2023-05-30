const { Task } = require("../models/Task");

module.exports = {
  getTasks(req, res) {
    Task.find().then((tasks) => res.json(tasks));
    console.log(tasks).catch((err) => res.status(500).json(err));
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
};
