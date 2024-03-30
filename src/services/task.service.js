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
  
  
  // Get All Task
// Pagination with sorting, searching, pagination
exports.getAllTasks = async (userId, query) => {
  //console.log("-- Task Service --getAllTasks ");
  Logger.verbose("[task.services.js] -> getAllTasks ]");

  try {
    const { sortBy, sortOrder, search, page = 1, limit = 10 } = query;
    const pipeline = [];

    // Match
    pipeline.push({ $match: { createdBy: userId } });

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { title: { $regex: search, $options: "i" } }, // search by title
            { description: { $regex: search, $options: "i" } }, // search by description
            { status: { $regex: search, $options: "i" } }, // status
          ],
        },
      });
    }

    if (sortBy && sortOrder) {
      pipeline.push({
        $sort: { [sortBy]: parseInt(sortOrder) === 1 ? 1 : -1 },
      });
    }

    if (page && limit) {
      pipeline.push({ $skip: (page - 1) * limit });
      pipeline.push({ $limit: parseInt(limit) });
    }
    console.log("pipeline", pipeline);
    // Build aggregation pipeline stages based on query parameters
    //   const pipeline = [
    //     { $match: { user: userId,isActive:true } },
    //     { $sort: { [sortBy]: parseInt(sortOrder) === 1 ? 1 : -1 } }, // Ensure sort order is properly handled
    //     { $skip: (page - 1) * limit },
    //     { $limit: parseInt(limit) }
    //   ];

    //   if (search) {
    //     pipeline.unshift({
    //       $match: {
    //         $or: [
    //           { title: { $regex: search, $options: 'i' } },
    //           { description: { $regex: search, $options: 'i' } }
    //         ]
    //       }
    //     });
    //   }

    const tasks = await Task.aggregate(pipeline);

    //  const total_pages = Math.ceil(tasks.length / limit);
    const total_pages = Math.ceil(tasks.length / limit);

    // current page 
    const current_page = Math.min(page, total_pages);

    
    const response = {
      data: {
        tasks,
        pagination: {
          total_pages,
          current_page: current_page, //parseInt(page),
          per_page: parseInt(limit),
        },
      },
    };

    console.log("task", response);
    return response;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to fetch tasks");
  }
};
