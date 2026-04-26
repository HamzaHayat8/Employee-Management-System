import Task from "../model/task.js";
import { asyncHandler } from "../util/asyncHandler.js";

/*
@desc create a new task
@route /api/task
*/
export const createTask = asyncHandler(async (req, res) => {
  const {
    employeeId,
    title,
    description,
    dueDate,
    status,
    priority,
    Progress,
  } = req.body;

  if (
    !employeeId ||
    !title ||
    !description ||
    !dueDate ||
    !status ||
    !priority
  ) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const task = await Task.create({
    employeeId,
    title,
    description,
    dueDate,
    status,
    priority,
    Progress,
  });

  res.status(201).send({ message: "Task created successfully", task });
});

/*
@desc get all tasks for an employee
@route /api/task
*/

export const getTasksByEmployee = asyncHandler(async (req, res) => {
  const employeeId = req.user._id;

  const tasks = await Task.find({ employeeId });
  if (!tasks) {
    return res
      .status(404)
      .send({ message: "No tasks found for this employee" });
  }
  res.status(200).send({ tasks });
});

/*
@desc update task by id
@route /api/task/update/:id
*/
export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user; // middleware se logged-in user

  console.log("Updating task with ID:", user);

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  let updateData = {};

  // =========================
  // Admin can update all fields
  // =========================
  if (user.role === "admin") {
    const { title, description, dueDate, status, priority, Progress } =
      req.body;

    updateData = {
      title,
      description,
      dueDate,
      status,
      priority,
      Progress,
    };
  }

  // =========================
  // Employee can update limited fields only
  // =========================
  else if (user.role === "employee") {
    const { status, Progress } = req.body;

    updateData = {
      status,
      Progress,
    };
  } else {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  // undefined fields remove
  Object.keys(updateData).forEach(
    (key) => updateData[key] === undefined && delete updateData[key],
  );

  const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    task: updatedTask,
  });
});
