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
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[\d\s\-\+\(\)]+$/.test(v);
        },
        message: "Invalid phone number format",
      },
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
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    deductions: {
      type: Number,
      min: [0, "Deductions cannot be negative"],
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
  { timestamps: true },
);

export default mongoose.model("Employee", employeeSchema);
