import leave from "../model/leave.js";
import { asyncHandler } from "../util/asyncHandler.js";

/*
@desc apply for leave
*/
export const applyForLeave = asyncHandler(async (req, res) => {
  const { type, startDate, endDate, reason } = req.body;

  if (!type || !startDate || !endDate || !reason) {
    return res.status(400).send({ message: "All fields are required" });
  }
  const newLeave = new leave({
    employeeId: req.user._id,
    type,
    startDate,
    endDate,
    reason,
  });
  await newLeave.save();
  res
    .status(201)
    .send({ message: "Leave applied successfully", leave: newLeave });
});

/*
@desc get all leaves for an employee
*/
export const getLeaves = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const leaves = await leave.find({ employeeId: userId });
  res.status(200).send({ message: "Leaves retrieved successfully", leaves });
});

/*
@desc get all leaves for an employee for admin 
*/
export const getAllLeaves = asyncHandler(async (req, res) => {
  const leaves = await leave.find().populate("employeeId", "name email");
  if (!leaves) {
    return res.status(404).send({ message: "No leaves found" });
  }
  res
    .status(200)
    .send({ message: "All leaves retrieved successfully", leaves });
});

/*
@desc update leave status for admin
*/
export const updateLeaveStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).send({ message: "Status is required" });
  }

  const leaves = await leave.findByIdAndUpdate(id, { status }, { new: true });

  res
    .status(200)
    .send({ message: "Leave status updated successfully", leaves });
});
