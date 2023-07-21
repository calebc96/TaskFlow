const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  board_id: {
    type: Schema.Types.ObjectId,
    ref: "board",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
});

const Task = model("task", taskSchema);

module.exports = Task;
