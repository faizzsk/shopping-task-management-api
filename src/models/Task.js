const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String, required: true },



    status: {
      type: String,
      required: true,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    isActive: { type: Boolean, default: true },

    createdBy: { type: String },

    updatedBy: { type: String },
    
    deletedBy: { type: String },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
