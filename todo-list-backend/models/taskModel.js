const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please enter a task name"],
    },
    done: {
      type: Boolean,
      required: false,
      default: false,
    },
    urgent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
