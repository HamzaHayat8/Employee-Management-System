import mongoose from "mongoose";

const payslipSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    allowances: {
      type: Number,
      required: true,
    },
    deductions: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Payslip = mongoose.model("Payslip", payslipSchema);

export default Payslip;
