import express from "express";

const router = express.Router();

import {
  createTask,
  updateTask,
  getTasksByEmployee,
} from "../controller/task.controller.js";

/*
@desc create a new task
@route /api/task/create
*/
router.post("/create", createTask);

/*
@desc get all tasks for an employee
@route /api/task
*/
router.get("/", getTasksByEmployee);

/*
@desc update task by id
@route /api/task/update/:id
*/
router.put("/update/:id", updateTask);

export default router;
