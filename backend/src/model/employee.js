import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "employee"],
      required: true,
    },

    // === New Fields for Face + GPS Attendance ===
    faceDescriptor: {
      type: [Number], // Array of numbers (128 or 512 floats)
      default: null,
    },

    officeCoordinates: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },

    allowedRadius: {
      type: Number,
      default: 100, // in meters
      min: 10,
      max: 500,
    },

    // Other existing fields...
    bio: String,
    department: String,
    position: String,
    basic_salary: Number,
    deductions: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Employee", employeeSchema);
