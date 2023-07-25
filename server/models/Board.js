const { Schema, model } = require("mongoose");

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
  categories: [{ type: Schema.Types.ObjectId, ref: "category" }],
});

const Board = model("board", boardSchema);

module.exports = Board;
