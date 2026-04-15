"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { format } from "date-fns";

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

export default function Attendance() {
  const [records, setRecords] = useState([]);

  const today = new Date();

  // ✅ Check In
  const handleCheckIn = () => {
    const now = new Date();

    const newRecord = {
      id: Date.now(),
      date: now,
      check_in: now.toLocaleTimeString(),
      check_out: null,
      status: now.getHours() >= 9 ? "Late" : "Present",
    };

    setRecords((prev) => [...prev, newRecord]);
  };

  // ✅ Check Out
  const handleCheckOut = () => {
    setRecords((prev) =>
      prev.map((r) =>
        new Date(r.date).toDateString() === new Date().toDateString()
          ? { ...r, check_out: new Date().toLocaleTimeString() }
          : r,
      ),
    );
  };

  // 📊 Chart Data
  const stats = {
    present: records.filter((r) => r.status === "Present").length,
    late: records.filter((r) => r.status === "Late").length,
    absent: 30 - records.length,
  };

  const chartData = [
    { name: "Present", value: stats.present },
    { name: "Late", value: stats.late },
    { name: "Absent", value: stats.absent },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Attendance Dashboard</h1>
          <p className="text-gray-500">{format(today, "EEEE, MMM dd yyyy")}</p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleCheckIn}
            className="bg-green-600 hover:bg-green-700"
          >
            Check In
          </Button>

          <Button
            onClick={handleCheckOut}
            className="bg-red-600 hover:bg-red-700"
          >
            Check Out
          </Button>
        </div>
      </div>

      {/* Top Cards + Chart */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="rounded-2xl shadow-blue-500 shadow">
          <CardHeader>
            <CardTitle>Present</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{stats.present}</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-yellow-500 shadow">
          <CardHeader>
            <CardTitle>Late</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-500">{stats.late}</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-red-500 shadow">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-40">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={chartData} dataKey="value" outerRadius={60}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card className="rounded-2xl shadow">
          <CardHeader>
            <CardTitle>Attendance Calendar</CardTitle>
          </CardHeader>

          <CardContent>
            <Calendar
              tileClassName={({ date }) => {
                const record = records.find(
                  (r) =>
                    new Date(r.date).toDateString() === date.toDateString(),
                );

                if (record?.status === "Present")
                  return "bg-green-200 rounded-lg";
                if (record?.status === "Late")
                  return "bg-yellow-200 rounded-lg";
              }}
            />
          </CardContent>
        </Card>

        {/* History Table */}
        <Card className="rounded-2xl shadow">
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
          </CardHeader>

          <CardContent className="max-h-87 overflow-auto">
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
                {records.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      {format(new Date(r.date), "dd MMM yyyy")}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          r.status === "Present" ? "default" : "secondary"
                        }
                      >
                        {r.status}
                      </Badge>
                    </TableCell>

                    <TableCell>{r.check_in}</TableCell>
                    <TableCell>{r.check_out || "--"}</TableCell>
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
