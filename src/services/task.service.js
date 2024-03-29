const Task = require("../models/Task");
const Logger = require("../utils/logger");

// Create Task
exports.createTask = async (taskData) => {
    Logger.verbose("[task.services.js] -> createTask ]");
  
    const task = new Task(taskData);
  
    await task.save();
  };
  

// Get Task By Id
exports.getTaskById = async (userId, taskId) => {

    Logger.verbose("[task.services.js] -> getTaskById ]");

    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  };
  

// Update by Id
exports.updateTaskById = async (userId, taskId, updateData) => {

    Logger.verbose("[task.services.js] -> updateTaskById ]");
    console.log("asdadad");
    try {
     
      const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId, user: userId,isActive:true },
        { ...updateData, updatedBy: userId },
        { new: true }
      );
      console.log("hg",updatedTask);
      if (!updatedTask) {
        console.log("asaaafs");
        throw new Error("Task not found");
      }
      return updatedTask;
    } catch (error) {
        console.log("error",error);
      throw new Error("Failed to update task");
    }
  };


  // Delete by Id
// Soft delete
exports.deleteTaskById = async (userId, taskId) => {
    try {
        Logger.verbose("[task.services.js] -> deleteTaskById ]");

  
      const deletedTask = await Task.findOneAndUpdate(
        { _id: taskId, user: userId,isActive:true },
        { isActive: false, deletedBy: userId }
      );
      if (!deletedTask) {
        throw new Error("Task not found");
      }
    } catch (error) {
  
      throw new Error("Failed to delete task");
    }
  };
  
  