import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

/*
@desc auth routes
@route /api/auth
*/
import authRoutes from "./src/router/auth.route.js";
app.use("/api/auth", authRoutes);

/*
@desc employee routes
@route /api/employee
*/
import employee from "./src/router/employee.route.js";
app.use("/api/employee", employee);

/*
@desc leave routes
@route /api/leave
*/
import leave from "./src/router/leave.route.js";
app.use("/api/leave", leave);

/*
@desc payslip routes
@route /api/payslip
*/
import payslip from "./src/router/payslip.route.js";
app.use("/api/payslip", payslip);

/*
@desc task routes
@route /api/task
*/
import task from "./src/router/task.route.js";
app.use("/api/task", task);

export default app;
