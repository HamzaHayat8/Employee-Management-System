import express from "express";
import { checkIn, checkOut } from "../controller/attendanceController.js";
import { isAuth } from "../middleware/auth.middleare.js";

const router = express.Router();

router.post("/checkin", isAuth, checkIn);
router.post("/checkout", isAuth, checkOut);

export default router;
