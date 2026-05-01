import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: () => new Date().setHours(0, 0, 0, 0), // Only date part
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["present", "late", "half-day", "absent"],
      default: "present",
    },
    // GPS Location (Office + Employee)
    officeLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    checkInLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    checkInDistance: {
      // in meters
      type: Number,
    },
    // Face verification proof (optional but recommended)
    faceImage: {
      type: String, // Cloudinary / AWS S3 URL
    },
    faceVerified: {
      type: Boolean,
      default: false,
    },
    ipAddress: String,
    deviceInfo: String,
  },
  { timestamps: true },
);

// Compound index to prevent duplicate attendance on same day
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
