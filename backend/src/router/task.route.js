import express from "express";

const router = express.Router();

import {
  createTask,
  updateTask,
  getTasksByEmployee,
  getAllTasks,
} from "../controller/task.controller.js";
import { isAuth } from "../middleware/auth.middleare.js";

/*
@desc create a new task
@route /api/task/create
*/
router.post("/create", isAuth, createTask);

/*
@desc get all tasks for an employee
@route /api/task/empl
*/
router.get("/empl", isAuth, getTasksByEmployee);

/*
@desc update task by id
@route /api/task/update/:id
*/
router.put("/update/:id", isAuth, updateTask);

/*
@desc get all tasks (admin)
@route /api/task/all
*/
router.get("/all", isAuth, getAllTasks);

export default router;
