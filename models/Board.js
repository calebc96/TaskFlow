const { Schema, model } = require("mongoose");

// Board Schema
const boardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  backgroundImage: {
    type: String,
    required: true,
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

const Board = model("board", boardSchema);

module.exports = Board;
