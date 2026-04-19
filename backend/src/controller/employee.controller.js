import employee from "../model/employee.js";
import { asyncHandler } from "../util/asyncHandler.js";

/*
@desc get all employees
*/
export const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await employee
    .find({
      role: "employee",
    })
    .select("-password");

  return res.status(200).json({
    success: true,
    message: "Employees fetched successfully",
    data: employees,
  });
});

/*
@desc update employee by id
*/
export const updateEmployeeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    email,
    phone,
    bio,
    department,
    position,
    basic_salary,
    allowances,
    deductions,
    role,
  } = req.body;

  const updatedEmployee = await employee
    .findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        email,
        phone,
        bio,
        department,
        position,
        basic_salary,
        allowances,
        deductions,
        role,
      },
      { new: true, runValidators: true },
    )
    .select("-password");

  if (!updatedEmployee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Employee updated successfully",
    data: updatedEmployee,
  });
});

/*
@desc delete employee by id
*/
export const deleteEmployeeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedEmployee = await employee.findByIdAndDelete(id);

  if (!deletedEmployee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
    data: { id: deletedEmployee._id },
  });
});
