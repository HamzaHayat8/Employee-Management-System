import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "employee", "manager"], // Added manager if needed
      required: true,
    },

    // === Face Recognition ===
    faceDescriptor: {
      type: [Number], // Array of numbers (128 or 512 floats from face-api.js)
      default: null,
    },

    // === GPS Office Location ===
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
      min: [10, "Minimum radius is 10 meters"],
      max: [500, "Maximum radius is 500 meters"],
    },

    // Other fields
    bio: { type: String, default: "" },
    department: String,
    position: String,
    basic_salary: { type: Number, default: 0 },
    allowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Optional: Index for faster queries
employeeSchema.index({ email: 1 });
employeeSchema.index({ "officeCoordinates.coordinates": "2dsphere" }); // For geospatial queries

export default mongoose.model("Employee", employeeSchema);
