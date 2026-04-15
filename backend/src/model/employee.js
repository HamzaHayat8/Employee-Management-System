import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    bio: {
      type: String,
    },
    department: {
      type: String,
    },
    position: {
      type: String,
    },
    basic_salary: {
      type: Number,
    },
    allowances: {
      type: Number,
    },
    deductions: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "employee"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Employee", employeeSchema);
