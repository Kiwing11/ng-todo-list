const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
/**
 * Retrieves all tasks for the logged-in user, with optional query parameters for filtering and sorting.
 *
 * @route GET /tasks
 * @access Private
 * @param {Object} req - The request object, including query parameters for filtering (`q` for search, `done_like` for task completion status) and sorting (`_sort` and `_order`).
 * @param {Object} res - The response object used to return the tasks and HTTP status code.
 */
const getTasks = asyncHandler(async (req, res) => {
  let query = { user_id: req.user.id };
  if (req.query.q) {
    query.name = { $regex: req.query.q, $options: "i" };
  }

  let sortQuery = {};
  if (req.query._sort && req.query._order) {
    sortQuery[req.query._sort] = req.query._order === "asc" ? 1 : -1;
  }

  if (req.query.done_like) {
    query.done = req.query.done_like === "true";
  }
  try {
    const tasks = await Task.find(query).sort(sortQuery);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Creates a new task for the logged-in user with the provided name, completion status, and urgency.
 *
 * @route POST /tasks
 * @access Private
 * @param {Object} req - The request object containing the task details in the body.
 * @param {Object} res - The response object used to return the created task and HTTP status code.
 */
const createTask = asyncHandler(async (req, res) => {
  const { name, done, urgent } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Name field is mandatory!");
  }
  const task = await Task.create({
    user_id: req.user.id,
    name,
    done,
    urgent,
  });

  res.status(201).json(task);
});

/**
 * Retrieves a single task by its ID for the logged-in user.
 *
 * @route GET /tasks/:id
 * @access Private
 * @param {Object} req - The request object, including the task ID in the route parameters.
 * @param {Object} res - The response object used to return the task and HTTP status code.
 */
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.status(200).json(task);
});

/**
 * Updates a task by its ID for the logged-in user, if they have permission.
 *
 * @route PUT /tasks/:id
 * @access Private
 * @param {Object} req - The request object, including the task ID in the route parameters and the updated task details in the body.
 * @param {Object} res - The response object used to return the updated task and HTTP status code.
 */
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user tasks");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
});

/**
 * Deletes a task by its ID for the logged-in user, if they have permission.
 *
 * @route DELETE /tasks/:id
 * @access Private
 * @param {Object} req - The request object, including the task ID in the route parameters.
 * @param {Object} res - The response object used to confirm deletion and return HTTP status code.
 */
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete other user tasks");
  }
  await Task.deleteOne({ _id: req.params.id });
  res.status(200).json(task);
});

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
