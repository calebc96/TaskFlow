const { Schema, model } = require("mongoose");

// Category Schema
const categorySchema = new Schema({
  board_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: "task" }],
});

const Category = model("category", categorySchema);

module.exports = Category;
