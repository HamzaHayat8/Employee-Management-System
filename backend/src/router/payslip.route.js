import express from "express";
const router = express.Router();

import {
  generatePayslip,
  getPayslip,
  getAllPayslips,
} from "../controller/payslip.controller.js";
import { isAuth } from "../middleware/auth.middleare.js";

/*@desc generate payslip for an employee
@route POST /api/payslip/generate
*/
router.post("/generate", isAuth, generatePayslip);

/*@desc get all payslips for an employee
@route GET /api/payslip
*/
router.get("/", isAuth, getPayslip);

/*@desc get all payslips for an employee for admin 
@route GET /api/payslip/all
*/
router.get("/all", isAuth, getAllPayslips);

export default router;
