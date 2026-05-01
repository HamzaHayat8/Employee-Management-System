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

export default function Attendance() {
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(true);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const { data: attendanceHistory = [], isLoading: historyLoading } =
    useGetMyAttendanceQuery();
  const { data: todayStatus } = useGetTodayAttendanceQuery();

  const [checkIn, { isLoading: checkInLoading }] = useCheckInMutation();
  const [checkOut, { isLoading: checkOutLoading }] = useCheckOutMutation();

  // Load Face-API Models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        setIsLoadingModels(false);
      } catch (err) {
        toast.error("Failed to load face recognition");
      }
    };
    loadModels();

    return () => {
      if (streamRef.current)
        streamRef.current.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsCapturing(true);
    } catch (err) {
      toast.error("Camera access denied");
    }
  };

  const captureFace = async () => {
    if (!videoRef.current) return;

    const detections = await faceapi
      .detectSingleFace(videoRef.current)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detections) {
      toast.error("No face detected. Please try again.");
      return;
    }

    setFaceDescriptor(Array.from(detections.descriptor));
    toast.success("Face captured successfully!");
  };

  // Get Current GPS Location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported");
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => reject(error.message),
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

      await checkIn(payload).unwrap();
      toast.success("Checked In Successfully!");
      setFaceDescriptor(null); // Reset face after success
    } catch (err) {
      toast.error(
        err?.data?.message ||
          "Check-in failed. Make sure you are inside office premises.",
      );
    }
  };

  // Handle Check Out
  const handleCheckOut = async () => {
    try {
      await checkOut({}).unwrap();
      toast.success("Checked Out Successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Check-out failed");
    }
  };

  // Stats
  const presentCount = attendanceHistory.filter(
    (r) => r.status === "present",
  ).length;
  const lateCount = attendanceHistory.filter((r) => r.status === "late").length;
  const absentCount = 30 - attendanceHistory.length; // Example for current month

  const chartData = [
    { name: "Present", value: presentCount },
    { name: "Late", value: lateCount },
    { name: "Absent", value: absentCount },
  ];

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Attendance</h1>
          <p className="text-gray-500">
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

      {/* Face Capture Area */}
      <Card>
        <CardHeader>
          <CardTitle>Face Verification</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingModels ? (
            <p>Loading face recognition models...</p>
          ) : (
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-80 border rounded-lg"
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

      {/* Stats Cards + Chart */}
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
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
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
                const record = attendanceHistory.find(
                  (r) =>
                    format(new Date(r.date), "yyyy-MM-dd") ===
                    format(date, "yyyy-MM-dd"),
                );
                if (record?.status === "present")
                  return "bg-green-200 font-bold";
                if (record?.status === "late") return "bg-yellow-200 font-bold";
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
                {attendanceHistory.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell>
                      {format(new Date(record.date), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.status === "present" ? "default" : "secondary"
                        }
                      >
                        {record.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(record.checkInTime), "hh:mm a")}
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
