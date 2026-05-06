/**
 * hooks/useAttendanceStats.js
 * Derives display-ready stats from raw attendance records.
 * Memoised so the page never recomputes on unrelated re-renders.
 */
import { useMemo } from "react";
import { computeAttendanceStats } from "../utils/attendanceHelpers";

/**
 * @param {Array}  records      - attendanceHistory.data from RTK Query
 * @param {number} workingDays  - days in the current working period (default 30)
 *
 * @typedef {Object} AttendanceStats
 * @property {number} presentCount
 * @property {number} lateCount
 * @property {number} absentCount
 * @property {Array<{ name: string, value: number }>} chartData
 */

/**
 * @param {Array}  records
 * @param {number} [workingDays=30]
 * @returns {AttendanceStats}
 */
export function useAttendanceStats(records = [], workingDays = 30) {
  return useMemo(
    () => computeAttendanceStats(records, workingDays),
    [records, workingDays]
  );
}
