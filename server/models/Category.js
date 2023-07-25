const { Schema, model } = require("mongoose");

// Category Schema
const categorySchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  boards: [{ type: Schema.Types.ObjectId, ref: "board" }],
});

const Category = model("category", categorySchema);

module.exports = Category;
