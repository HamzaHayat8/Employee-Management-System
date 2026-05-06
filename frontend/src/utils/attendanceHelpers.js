/**
 * utils/attendanceHelpers.js
 * Pure functions for attendance data transformations and calendar utilities.
 * No side-effects, fully unit-testable.
 */
import { isSameDay, parseISO } from "date-fns";

/**
 * Status → CSS class map for the react-calendar tile.
 */
const STATUS_CLASS_MAP = {
  present: "tile-present",
  late: "tile-late",
  absent: "tile-absent",
};

/**
 * Returns a CSS class for a calendar tile based on attendance records.
 * @param {Array<{ date: string, status: string }>} records
 * @param {Date} tileDate
 * @returns {string | null}
 */
export const getTileClassName = (records = [], tileDate) => {
  const match = records.find((r) => isSameDay(parseISO(r.date), tileDate));
  if (!match) return null;
  return STATUS_CLASS_MAP[match.status] ?? null;
};

/**
 * Derives attendance stats from a flat records array.
 * Absent is estimated as (workingDaysInMonth - checkedInDays).
 * @param {Array} records
 * @param {number} workingDays - defaults to 30
 * @returns {{ presentCount: number, lateCount: number, absentCount: number, chartData: Array }}
 */
export const computeAttendanceStats = (records = [], workingDays = 30) => {
  const presentCount = records.filter((r) => r.status === "present").length;
  const lateCount = records.filter((r) => r.status === "late").length;
  const absentCount = Math.max(0, workingDays - records.length);

  const chartData = [
    { name: "Present", value: presentCount },
    { name: "Late", value: lateCount },
    { name: "Absent", value: absentCount },
  ];

  return { presentCount, lateCount, absentCount, chartData };
};

/**
 * Badge variant resolver for attendance status.
 * @param {string} status
 * @returns {"default" | "secondary" | "destructive"}
 */
export const statusVariant = (status) => {
  const map = {
    present: "default",
    late: "secondary",
    absent: "destructive",
  };
  return map[status] ?? "secondary";
};
