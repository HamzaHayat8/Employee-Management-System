import Attendance from "../model/Attendance.js";
import Employee from "../model/employee.js";
import geolib from "geolib";
import { asyncHandler } from "../util/asyncHandler.js";

// @desc   Mark Check-In with GPS + Face
// @route  POST /api/attendance/checkin
export const checkIn = asyncHandler(async (req, res) => {
  const { employeeId } = req.user._id; // Assuming employeeId is in JWT token
  const { latitude, longitude, faceImage } = req.body; // faceImage = base64 or URL

  const employee = await Employee.findById(employeeId);
  if (!employee)
    return res
      .status(404)
      .json({ success: false, message: "Employee not found" });

  // 1. GPS Check
  const officePoint = {
    latitude: employee.officeCoordinates.coordinates[1],
    longitude: employee.officeCoordinates.coordinates[0],
  };

  const employeePoint = { latitude, longitude };

  const distance = geolib.getDistance(officePoint, employeePoint);

  if (distance > employee.allowedRadius) {
    return res.status(403).json({
      success: false,
      message: `You are outside office premises. Distance: ${Math.round(distance)}m`,
    });
  }

  // 2. Face Verification (Recommended: Do this on Frontend with face-api.js)
  // If you send face descriptor from frontend:
  let faceVerified = false;
  if (req.body.faceDescriptor && employee.faceDescriptor) {
    const distanceScore = faceApiEuclideanDistance(
      req.body.faceDescriptor,
      employee.faceDescriptor,
    );
    faceVerified = distanceScore < 0.6; // Threshold (lower = stricter)
  }

  // Create attendance record
  const today = new Date().setHours(0, 0, 0, 0);

  let attendance = await Attendance.findOne({
    employee: employeeId,
    date: today,
  });

  if (attendance) {
    return res
      .status(400)
      .json({ success: false, message: "Already checked in today" });
  }

  attendance = await Attendance.create({
    employee: employeeId,
    checkInTime: new Date(),
    checkInLocation: { type: "Point", coordinates: [longitude, latitude] },
    checkInDistance: distance,
    faceVerified,
    faceImage, // store URL if uploaded
    status: "present",
  });

  res.status(201).json({
    success: true,
    message: "Check-in successful",
    data: attendance,
    distance: Math.round(distance),
    faceVerified,
  });
});

// Similar function for checkOut (update existing record)
export const checkOut = asyncHandler(async (req, res) => {
  const { employeeId } = req.user._id; // Assuming employeeId is in JWT token
  const today = new Date().setHours(0, 0, 0, 0);

  const attendance = await Attendance.findOne({
    employee: employeeId,
    date: today,
  });

  if (!attendance) {
    return res
      .status(404)
      .json({ success: false, message: "No check-in record found" });
  }

  attendance.checkOutTime = new Date();
  await attendance.save();

  res.json({
    success: true,
    message: "Check-out successful",
    data: attendance,
  });
});
