import express from "express";
import {
  checkIn,
  checkOut,
  getMyAttendance,
  getTodayAttendance,
} from "../controller/attendanceController.js";
import { isAuth } from "../middleware/auth.middleare.js";

const router = express.Router();

/*
@desc Attendance routes
@route /api/attendance/
*/
router.post("/checkin", isAuth, checkIn);
router.post("/checkout", isAuth, checkOut);
router.get("/my-attendance", isAuth, getMyAttendance);
router.get("/today", isAuth, getTodayAttendance);

export default router;
