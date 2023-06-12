const { Task, Board } = require("../models");

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
    console.log(req.params.taskId);
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
  // Retrieve all boards
  getBoards(req, res) {
    Board.find()
      .populate("tasks") // Populate tasks associated with each board
      .then((allBoards) => res.json(allBoards))
      .catch((err) => res.status(500).json(err));
  },

  // Retrieve a single board by ID
  getSingleBoard(req, res) {
    Board.findOne({ _id: req.params.boardId })
      .populate("tasks") // Populate tasks associated with the board
      .then((singleBoard) =>
        !singleBoard
          ? res.status(404).json({ message: "No board with that ID" })
          : res.json(singleBoard)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new board
  createBoard(req, res) {
    Board.create(req.body)
      .then((newBoardData) => res.json(newBoardData))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a board
  deleteBoard(req, res) {
    Board.findOneAndDelete({ _id: req.params.boardId })
      .then((deletedBoard) =>
        !deletedBoard
          ? res.status(404).json({ message: "No board with this ID" })
          : res.json(deletedBoard)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Edit or update a board
  updateBoard(req, res) {
    Board.findOneAndUpdate(
      { _id: req.params.boardId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updatedBoard) =>
        !updatedBoard
          ? res.status(404).json({ message: "No board with this ID" })
          : res.json(updatedBoard)
      )
      .catch((err) => res.status(500).json(err));
  },
};
