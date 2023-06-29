const { Schema, model } = require("mongoose");
const User = require("./User");

// Board Schema
const boardSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
