import Attendance from "../model/Attendance.js";
import Employee from "../model/employee.js";
import geolib from "geolib";
import { asyncHandler } from "../util/asyncHandler.js";
import { faceDistance } from "../util/faceDistance.js";

/*
@desc   Mark Check-In with GPS + Face Verification
@route  POST /api/attendance/checkin
*/
export const checkIn = asyncHandler(async (req, res) => {
  const employeeId = req.user._id;
  const { latitude, longitude, faceDescriptor, status } = req.body;

  if (!latitude || !longitude || !faceDescriptor) {
    return res.status(400).json({
      success: false,
      message: "Location and face descriptor are required",
    });
  }

  const employee = await Employee.findById(employeeId);
  if (!employee) {
    return res
      .status(404)
      .json({ success: false, message: "Employee not found" });
  }

  //  ====================== Time Check ======================
  const now = new Date();

  const officeStartTime = new Date();
  officeStartTime.setHours(9, 0, 0, 0);

  let attendanceStatus = "present";

  if (now > officeStartTime) {
    attendanceStatus = "late";
  }

  if (!employee.faceDescriptor) {
    return res.status(400).json({
      success: false,
      message: "Face not registered. Please contact admin.",
    });
  }

  // ====================== GPS Check ======================
  const officePoint = {
    latitude: employee.officeCoordinates.coordinates[1],
    longitude: employee.officeCoordinates.coordinates[0],
  };

  const employeePoint = { latitude, longitude };

  const distance = geolib.getDistance(officePoint, employeePoint);

  // if (distance > (employee.allowedRadius || 100)) {
  //   return res.status(403).json({
  //     success: false,
  //     message: `You are outside office premises. Distance: ${Math.round(distance)}m`,
  //   });
  // }

  // ====================== Face Verification ======================
  const distanceScore = faceDistance(faceDescriptor, employee.faceDescriptor);
  const faceVerified = distanceScore < 0.6;

  if (!faceVerified) {
    return res.status(401).json({
      success: false,
      message:
        "Face verification failed. Face does not match registered employee.",
      distanceScore: distanceScore.toFixed(4),
    });
  }

  // ====================== Create Attendance ======================
  const today = new Date().setHours(0, 0, 0, 0);

  const existingAttendance = await Attendance.findOne({
    employee: employeeId,
    date: today,
  });

  if (existingAttendance) {
    return res.status(400).json({
      success: false,
      message: "You have already checked in today",
    });
  }

  const attendance = await Attendance.create({
    employee: employeeId,
    date: today,
    checkInTime: new Date(),
    checkInLocation: { type: "Point", coordinates: [longitude, latitude] },
    checkInDistance: distance,
    faceVerified: true,
    status: attendanceStatus,
  });

  res.status(201).json({
    success: true,
    message: "Check-in successful",
    data: attendance,
    distance: Math.round(distance),
    faceVerified: true,
  });
});

/*
@desc   Check Out
@route  POST /api/attendance/checkout
*/
export const checkOut = asyncHandler(async (req, res) => {
  const employeeId = req.user._id;
  const today = new Date().setHours(0, 0, 0, 0);

  const attendance = await Attendance.findOne({
    employee: employeeId,
    date: today,
  });

  if (!attendance) {
    return res.status(404).json({
      success: false,
      message: "No check-in record found for today",
    });
  }

  if (attendance.checkOutTime) {
    return res.status(400).json({
      success: false,
      message: "You have already checked out today",
    });
  }

  attendance.checkOutTime = new Date();
  await attendance.save();

  res.status(200).json({
    success: true,
    message: "Check-out successful",
    data: attendance,
  });
});

// aaaaaaaa
export const getMyAttendance = asyncHandler(async (req, res) => {
  const employeeId = req.user._id;

  if (!employeeId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const attendance = await Attendance.find({ employee: employeeId })
    .sort({ date: -1 }) // Latest first
    .limit(90); // Last 3 months (adjust as needed)

  res.status(200).json({
    success: true,
    count: attendance.length,
    data: attendance,
  });
});

// ====================== NEW: Get Today's Attendance Status ======================
export const getTodayAttendance = asyncHandler(async (req, res) => {
  const employeeId = req.user._id;
  const today = new Date().setHours(0, 0, 0, 0);

  const todayAttendance = await Attendance.findOne({
    employee: employeeId,
    date: today,
  });

  if (!todayAttendance) {
    return res.status(200).json({
      success: true,
      data: null,
      message: "No attendance record for today yet",
    });
  }

  res.status(200).json({
    success: true,
    data: todayAttendance,
  });
});
