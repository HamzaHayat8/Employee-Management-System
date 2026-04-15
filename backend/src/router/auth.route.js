import express from "express";
const router = express.Router();
import {
  createEmployee,
  loginEmployee,
  changePassword,
} from "../controller/auth.controller.js";
import { isAuth } from "../middleware/auth.middleare.js";

/*
@desc create employee
@route POST /api/auth/create
*/
router.post("/create", createEmployee);

/*
@desc login employee
@route POST /api/auth/login
*/
router.post("/login", loginEmployee);

/*
@desc change password
@route POST /api/auth/change-password
*/
router.post("/change-password", isAuth, changePassword);

export default router;
