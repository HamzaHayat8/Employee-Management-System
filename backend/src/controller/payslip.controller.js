import Payslip from "../model/payslip.js";
import { asyncHandler } from "../util/asyncHandler.js";

/*@desc generate payslip for an employee
@route POST /api/payslip/generate
*/
export const generatePayslip = asyncHandler(async (req, res) => {
  const { employeeId, month, year, basicSalary, allowances, deductions } =
    req.body;

  if (
    !employeeId ||
    !month ||
    !year ||
    !basicSalary ||
    !allowances ||
    !deductions
  ) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const newPayslip = new Payslip({
    employeeId,
    month,
    year,
    basicSalary,
    allowances,
    deductions,
  });
  await newPayslip.save();
  res
    .status(201)
    .send({ message: "Payslip generated successfully", payslip: newPayslip });
});

/*@desc get payslip for an employee
@route GET /api/payslip
*/
export const getPayslip = asyncHandler(async (req, res) => {
  const employeeId = req.user._id;
  if (!employeeId) {
    return res.status(400).send({ message: "Employee ID is required" });
  }
  const payslip = await Payslip.find({ employeeId });
  res.status(200).send({ payslips: payslip });
});

/*@desc get all payslips for admin
@route GET /api/payslip/all
*/
export const getAllPayslips = asyncHandler(async (req, res) => {
  const payslips = await Payslip.find().populate("employeeId", "name email");
  if (!payslips) {
    return res.status(404).send({ message: "No payslips found" });
  }
  res.status(200).send({ payslips });
});
