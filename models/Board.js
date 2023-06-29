const { Schema, model } = require("mongoose");
const User = require("./User");

// Board Schema
const boardSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
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
