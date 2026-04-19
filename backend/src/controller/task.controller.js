import Task from "../model/task.js";
import { asyncHandler } from "../util/asyncHandler.js";

/*
@desc create a new task
@route /api/task
*/
export const createTask = asyncHandler(async (req, res) => {
  const { employeeId, title, description, dueDate, status, priority } =
    req.body;

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
  const { title, description, dueDate, status, priority } = req.body;

  if (!title || !description || !dueDate || !status || !priority) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const task = await Task.findByIdAndUpdate(
    id,
    { title, description, dueDate, status, priority },
    { new: true },
  );

  if (!task) {
    return res.status(404).send({ message: "Task not found" });
  }

  res.status(200).send({ message: "Task updated successfully", task });
});
