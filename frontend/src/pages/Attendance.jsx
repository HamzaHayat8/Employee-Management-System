"use client";

import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import * as faceapi from "face-api.js";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/common/card";

import { Button } from "../components/common/button";
import { Badge } from "../components/common/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/common/table";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import {
  useCheckInMutation,
  useCheckOutMutation,
  useGetMyAttendanceQuery,
  useGetTodayAttendanceQuery,
} from "../services/attendance/attendanceApi";
import { toast } from "react-hot-toast";
import { loadModels } from "../utils/loadModels";

export default function Attendance() {
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(true);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // RTK Query Hooks
  const {
    data: attendanceHistory,
    isLoading: historyLoading,
    refetch,
  } = useGetMyAttendanceQuery();
  console.log("Attendance History:", attendanceHistory);
  const { data: todayStatus } = useGetTodayAttendanceQuery();

  const [checkIn, { isLoading: checkInLoading }] = useCheckInMutation();
  const [checkOut, { isLoading: checkOutLoading }] = useCheckOutMutation();

  // Load Face-API Models
  useEffect(() => {
    loadModels().then(() => setIsLoadingModels(false));

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsCapturing(true);
    } catch (err) {
      toast.error("Camera access denied or not available");
    }
  };

  const captureFace = async () => {
    if (!videoRef.current) return;

    try {
      const detections = await faceapi
        .detectSingleFace(videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detections) {
        toast.error("No face detected. Please adjust lighting or position.");
        return;
      }

      setFaceDescriptor(Array.from(detections.descriptor));
      toast.success("Face captured successfully!");
    } catch (error) {
      toast.error("Failed to capture face");
    }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject("Geolocation not supported");
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        (err) => reject(err.message),
      );
    });
  };

  // Handle Check In
  const handleCheckIn = async () => {
    if (!faceDescriptor) {
      toast.error("Please capture your face first!");
      return;
    }

    try {
      const location = await getCurrentLocation();

      const payload = {
        latitude: location.latitude,
        longitude: location.longitude,
        faceDescriptor,
      };

      const result = await checkIn(payload).unwrap();

      toast.success("✅ Checked In Successfully!");
      setFaceDescriptor(null);
      refetch(); // Refresh history
    } catch (err) {
      toast.error(err?.data?.message || "Check-in failed");
    }
  };

  // Handle Check Out
  const handleCheckOut = async () => {
    try {
      await checkOut({}).unwrap();
      toast.success("✅ Checked Out Successfully!");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Check-out failed");
    }
  };

  // Stats
  const presentCount = attendanceHistory?.data.filter(
    (r) => r.status === "present",
  ).length;
  const lateCount = attendanceHistory?.data.filter(
    (r) => r.status === "late",
  ).length;
  const absentCount = Math.max(0, 30 - attendanceHistory?.data.length);

  const chartData = [
    { name: "Present", value: presentCount },
    { name: "Late", value: lateCount },
    { name: "Absent", value: absentCount },
  ];

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">My Attendance</h1>
          <p className="text-sm text-gray-500">
            {format(new Date(), "EEEE, MMMM dd, yyyy")}
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={startWebcam} variant="outline">
            Open Camera
          </Button>
          <Button
            onClick={handleCheckIn}
            disabled={checkInLoading || !faceDescriptor}
            className="bg-green-600 hover:bg-green-700"
          >
            {checkInLoading ? "Checking In..." : "Check In"}
          </Button>
          <Button
            onClick={handleCheckOut}
            disabled={checkOutLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {checkOutLoading ? "Checking Out..." : "Check Out"}
          </Button>
        </div>
      </div>

      {/* Today's Status */}
      {todayStatus?.data && (
        <Card className="border-green-500">
          <CardContent className="pt-6">
            <p className="text-green-600 font-semibold">
              ✅ You have already checked in today at{" "}
              {format(new Date(todayStatus.data.checkInTime), "hh:mm a")}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Face Capture Area */}
      <Card>
        <CardHeader>
          <CardTitle>Face Verification</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingModels ? (
            <p className="text-amber-600">Loading face recognition models...</p>
          ) : (
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-80 border-2 border-gray-300 rounded-lg"
                />
                <Button
                  onClick={captureFace}
                  disabled={!isCapturing}
                  className="mt-3 w-full"
                >
                  Capture Face
                </Button>
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats + Chart */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Present</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">{presentCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Late</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-yellow-500">{lateCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="value" outerRadius={70}>
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Calendar & History */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              tileClassName={({ date }) => {
                const record = attendanceHistory?.data.find(
                  (r) =>
                    format(new Date(r.date), "yyyy-MM-dd") ===
                    format(date, "yyyy-MM-dd"),
                );
                if (record?.status === "present")
                  return "bg-green-400 font-bold rounded";
                if (record?.status === "late")
                  return "bg-yellow-200 font-bold rounded";
                return "";
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance History</CardTitle>
          </CardHeader>
          <CardContent className="max-h-96 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceHistory?.data.map((record) => (
                  <TableRow key={record._id || record.id}>
                    <TableCell>
                      {format(new Date(record.date), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.status === "present" ? "default" : "secondary"
                        }
                      >
                        {record.status?.toUpperCase() || "PRESENT"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {record.checkInTime
                        ? format(new Date(record.checkInTime), "hh:mm a")
                        : "--"}
                    </TableCell>
                    <TableCell>
                      {record.checkOutTime
                        ? format(new Date(record.checkOutTime), "hh:mm a")
                        : "--"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
