const mongoose = require("mongoose");

// Board Schema
const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  backgroundImage: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
