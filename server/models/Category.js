const { Schema, model } = require("mongoose");

// Category Schema
const categorySchema = new Schema({
  boards: [{ type: Schema.Types.ObjectId, ref: "board" }],
  category: {
    type: String,
    required: true,
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: "task" }],
});

const Category = model("category", categorySchema);

module.exports = Category;
