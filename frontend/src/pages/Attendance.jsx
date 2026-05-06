"use client";

import {
  useGetMyAttendanceQuery,
  useGetTodayAttendanceQuery,
} from "../services/attendance/attendanceApi";

import { useFaceCapture } from "../hooks/useFaceCapture";
import { useAttendanceActions } from "../hooks/useAttendanceActions";
import { useAttendanceStats } from "../hooks/useAttendanceStats";

import { AttendanceActions } from "../components/attendance/AttendanceActions";
import { TodayStatus } from "../components/attendance/TodayStatus";
import { FaceCapture } from "../components/attendance/FaceCapture";
import { AttendanceStats } from "../components/attendance/AttendanceStats";
import { AttendanceCalendar } from "../components/attendance/AttendanceCalendar";
import { AttendanceTable } from "../components/attendance/AttendanceTable";

export default function AttendancePage() {
  // ─── Server state ────────────────────────────────────────────────────────
  const {
    data: attendanceHistory,
    isLoading: historyLoading,
    refetch,
  } = useGetMyAttendanceQuery();

  const { data: todayStatus } = useGetTodayAttendanceQuery();

  const records = attendanceHistory?.data ?? [];

  // ─── Feature hooks ───────────────────────────────────────────────────────
  const face = useFaceCapture();

  console.log("Face descriptor:", face.faceDescriptor);

  const actions = useAttendanceActions(() => {
    face.resetDescriptor();
    refetch();
  });

  const stats = useAttendanceStats(records);

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      {/* 1. Header + action buttons */}
      <AttendanceActions
        onOpenCamera={face.startWebcam}
        onCheckIn={() => actions.handleCheckIn(face.faceDescriptor)}
        onCheckOut={actions.handleCheckOut}
        checkInLoading={actions.checkInLoading}
        checkOutLoading={actions.checkOutLoading}
        faceDescriptor={face.faceDescriptor}
      />

      {/* 2. "Already checked in" banner */}
      <TodayStatus todayStatus={todayStatus?.data} />

      {/* 3. Webcam + face capture */}
      <FaceCapture
        videoRef={face.videoRef}
        isCapturing={face.isCapturing}
        isLoadingModels={face.isLoadingModels}
        faceDescriptor={face.faceDescriptor}
        onStart={face.startWebcam}
        onCapture={face.captureFace}
      />

      {/* 4. Present / late / pie chart */}
      {!historyLoading && (
        <AttendanceStats
          presentCount={stats.presentCount}
          lateCount={stats.lateCount}
          absentCount={stats.absentCount}
          chartData={stats.chartData}
        />
      )}

      {/* 5. Calendar + history table */}
      <div className="grid md:grid-cols-2 gap-6">
        <AttendanceCalendar records={records} />
        <AttendanceTable records={records} />
      </div>
    </div>
  );
}
