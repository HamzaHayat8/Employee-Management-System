import express from "express";
const router = express.Router();

import {
  applyForLeave,
  getLeaves,
  getAllLeaves,
  updateLeaveStatus,
} from "../controller/leave.controller.js";
import { isAuth } from "../middleware/auth.middleare.js";

/*
@desc apply for leave
@route POST /api/leave/apply
*/
router.post("/apply", isAuth, applyForLeave);

/*
@desc get all leaves for an employee
@route GET /api/leave
*/
router.get("/", isAuth, getLeaves);

/*@desc get all leaves for an employee for admin 
@route GET /api/leave/all
*/
router.get("/all", isAuth, getAllLeaves);

/*
@desc update leave status for admin
@route PUT /api/leave/:id/status
*/
router.put("/:id/status", isAuth, updateLeaveStatus);

export default router;
