const { validationResult } = require("express-validator");

const taskService = require("../services/task.service");
const {
  validateTaskCreation,
} = require("../../src/utils/validation/task.validation");
const Logger = require("../utils/logger");
const { sendErrorResponse } = require("../utils/response/error.response");
const { sendSuccessResponse } = require("../utils/response/sucess.response");

// Create Task
exports.createTask = async (req, res) => {
  Logger.verbose("[task.controllers.js] -> createTask ]");

  await Promise.all(
    validateTaskCreation.map((validation) => validation.run(req))
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendErrorResponse(res, 400, errors.array()[0]?.msg);
    // return sendErrorResponse(res, 400, errors.array());
  }

  try {
    const userId = req?.user?.userId;
    const taskData = { ...req.body, user: userId, createdBy: userId };

    await taskService.createTask(taskData);

    sendSuccessResponse(res, "", 201, "Task created succesfully");
  } catch (error) {
    console.log("error", error);
    sendErrorResponse(res, 500, "Failed to create a task");
  }
};

// Get Task By Id
exports.getTaskById = async (req, res) => {
  Logger.verbose("[task.controllers.js] -> getTaskById ]");

  try {
    const userId = req?.user?.userId;
    const taskId = req?.params?.id;

    const task = await taskService.getTaskById(userId, taskId);
    sendSuccessResponse(res, task, 200, "");
  } catch (error) {
    sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Failed to fetch a task"
    );
  }
};

// Update

exports.updateTaskById = async (req, res) => {
  Logger.verbose("[task.controllers.js] -> updateTaskById ]");

  try {
    const userId = req?.user?.userId;
    const taskId = req?.params?.id;

    const updateBody = req.body;

    console.log("updateBody", updateBody);
    const updatedTask = await taskService.updateTaskById(
      userId,
      taskId,
      updateBody
    );
    console.log("update", updatedTask);
    sendSuccessResponse(res, "", 200, "Task updated succesfully");
  } catch (error) {
    sendErrorResponse(res, 500, "Failed to update a task");
  }
};

// Delete By ID
exports.deleteTaskById = async (req, res) => {
  Logger.verbose("[task.controllers.js] -> deleteTaskById ]");

  try {
    const userId = req.user.userId;
    const taskId = req.params.id;

    await taskService.deleteTaskById(userId, taskId);
    sendSuccessResponse(res, "", 200, "Task deleted succesfully");
  } catch (error) {
    sendErrorResponse(res, 500, "Failed to delete a task");
  }
};

// Get All Task
exports.getAllTasks = async (req, res) => {
  Logger.verbose("[task.controllers.js] -> getAllTasks ]");

  try {
    const userId = req.user.userId; // Extract userId from JWT payload
    //const { sortBy, sortOrder, search, page, limit } = req.query;
    const query = req?.query;
    const tasks = await taskService.getAllTasks(userId, query);
    sendSuccessResponse(res, tasks, 200, "");
  } catch (error) {
    console.log("err", error);
    sendErrorResponse(res, 500, "Failed to find records");
    // res.status(500).json({ error: "Failed to fetch tasks" });
  }
};
