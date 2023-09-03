const { Board, Category } = require("../models");

const getCategory = (req, res) => {
  Category.find()
    .populate("tasks") // Populate the tasks field
    .then(async (categories) => {
      return res.json(categories);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

const createCategory = async (req, res) => {
  Category.create(req.body)
    .then((category) => {
      return Board.findOneAndUpdate(
        { _id: req.body.board_id },
        { $addToSet: { categories: category._id } },
        { new: true }
      );
    })
    .then((user) =>
      !user
        ? res.status(404).json({
            message: "Category created, but found no user with that ID",
          })
        : res.json("Created category 🎉")
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndRemove({
      _id: req.params.boardId,
    });
    if (!category) {
      return res.status(404).json({ message: "No category with this id!" });
    }

    const user = await User.findOneAndUpdate(
      { categories: req.params.boardId },
      { $pull: { categories: req.params.boardId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        message: "Category deleted, but no user with this id!",
      });
    }

    return res.json({ message: "Board successfully deleted!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getCategory,
  createCategory,
  deleteCategory,
};
