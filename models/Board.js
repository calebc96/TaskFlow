const { Schema, Model } = require("mongoose");

// Board Schema
const boardSchema = new Schema({
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
