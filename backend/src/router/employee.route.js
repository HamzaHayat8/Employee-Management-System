import express from "express";
const router = express.Router();

import {
  getAllEmployees,
  updateEmployeeById,
  deleteEmployeeById,
} from "../controller/employee.controller.js";
import { isAuth } from "../middleware/auth.middleare.js";

/*
@desc get all employees
@route GET /api/employee/getEmployee
*/
router.get("/getEmployee", isAuth, getAllEmployees);

/*
@desc update employee by id
@route PUT /api/employee/updateEmployee/:id
*/
router.put("/updateEmployee/:id", isAuth, updateEmployeeById);

/*
@desc delete employee by id
@route DELETE /api/employee/deleteEmployee/:id
*/
router.delete("/deleteEmployee/:id", isAuth, deleteEmployeeById);

export default router;
