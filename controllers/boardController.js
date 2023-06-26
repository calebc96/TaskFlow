const getBoards = (req, res) => {
  Board.find()
    .populate("user") // Populate the boards field
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
        { _id: req.body.userId },
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

// Remove a board from `savedBoards`
const deleteBoard = async ({ user, params }, res) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { $pull: { boards: { boardId: params.bookId } } },
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
  getsingleBoard,
  getBoards,
  createBoard,
  deleteBoard,
};
