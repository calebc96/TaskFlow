const { User, Board } = require("../models");

const getBoards = (req, res) => {
  Board.find()
    .populate("tasks") // Populate the boards field
    .then(async (boards) => {
      return res.json(boards);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

const getsingleBoard = (req, res) => {
  Board.findOne({ _id: req.params.boardId })
    .select("-__v")
    .then(async (board) =>
      !board
        ? res.status(404).json({ message: "No Board with that ID" })
        : res.json({
            board,
          })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// Save a board for a user
// user comes from `req.user` created in the auth middleware function
const createBoard = async (req, res) => {
  Board.create(req.body)
    .then((board) => {
      return User.findOneAndUpdate(
        { _id: req.body.user_id },
        { $addToSet: { boards: board._id } },
        { new: true }
      );
    })
    .then((user) =>
      !user
        ? res.status(404).json({
            message: "board created, but found no user with that ID",
          })
        : res.json("Created board 🎉")
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndRemove({ _id: req.params.boardId });
    if (!board) {
      return res.status(404).json({ message: "No board with this id!" });
    }

    const user = await User.findOneAndUpdate(
      { boards: req.params.boardId },
      { $pull: { boards: req.params.boardId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        message: "Board deleted, but no user with this id!",
      });
    }

    return res.json({ message: "Board successfully deleted!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getsingleBoard,
  getBoards,
  createBoard,
  deleteBoard,
};
