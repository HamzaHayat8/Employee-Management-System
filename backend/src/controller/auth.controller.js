import { asyncHandler } from "../util/asyncHandler.js";
import bcrypt from "bcrypt";
import { generateToken } from "../util/generateToken.js";
import employee from "../model/employee.js";

/*
@desc create employee
*/
export const createEmployee = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    bio,
    department,
    position,
    basic_salary,
    allowances,
    deductions,
    role,
  } = req.body;

  // ✅ Validate required fields
  if (!first_name || !last_name || !email || !password || !phone || !role) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided",
    });
  }

  // ✅ Normalize email
  const normalizedEmail = email.toLowerCase();

  // ✅ Check existing employee
  const existingEmployee = await employee.findOne({ email: normalizedEmail });

  if (existingEmployee) {
    return res.status(409).json({
      success: false,
      message: "Employee already exists",
    });
  }

  // ✅ Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // ✅ Create employee
  const newEmployee = await employee.create({
    first_name,
    last_name,
    email: normalizedEmail,
    password: hashedPassword,
    phone,
    bio,
    department,
    position,
    basic_salary,
    allowances,
    deductions,
    role,
  });

  // ✅ Remove password before sending response
  const employeeResponse = newEmployee.toObject();
  delete employeeResponse.password;

  return res.status(201).json({
    success: true,
    message: "Employee created successfully",
    data: employeeResponse,
  });
});

/*
@desc login employee
*/
export const loginEmployee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided",
    });
  }

  const normalizedEmail = email.toLowerCase();

  const existingEmployee = await employee.findOne({ email: normalizedEmail });

  if (!existingEmployee) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingEmployee.password,
  );

  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = generateToken(existingEmployee._id);

  // ✅ Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  // ✅ Remove password before sending response
  const employeeResponse = existingEmployee.toObject();
  delete employeeResponse.password;

  res.status(200).json({
    success: true,
    message: "Employee logged in successfully",
    employee: employeeResponse,
  });
});

/*
@ change password
*/
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const employeeId = req.user._id;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided",
    });
  }

  const emp = await employee.findById(employeeId);

  if (!emp) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(currentPassword, emp.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Invalid current password",
    });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  emp.password = hashedPassword;
  await emp.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});
