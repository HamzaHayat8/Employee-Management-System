"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/common/card";
import { Progress } from "../components/common/progress";
import { Badge } from "../components/common/badge";
import { Avatar, AvatarFallback } from "../components/common/avatar";
import { tasks } from "../assets/data";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AddTaskModal from "../components/tasks/AddTaskModal";
import Loader from "../components/common/Loading";

export default function TasksPage() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    setData(tasks);
  }, []);

  if (!data) {
    return <Loader />;
  }

  const totalTasks = data.length;
  const completedTasks = data.filter(
    (task) => task.status === "Completed",
  ).length;
  const pendingTasks = data.filter((task) => task.status === "Pending").length;
  const inProgressTasks = data.filter(
    (task) => task.status === "In Progress",
  ).length;

  const chartData = [
    { name: "Pending", value: inProgressTasks },
    { name: "In Progress", value: pendingTasks },
    { name: "Completed", value: completedTasks },
  ];

  return (
    <div className=" space-y-6 ">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium">Task Management</h1>
          <p className="text-xs text-zinc-600">Track and manage team tasks</p>
        </div>

        <AddTaskModal />
      </div>

      {/* Stats + Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <Card>
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalTasks}</p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {completedTasks || 0}
            </p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="shadow-sm hover:shadow-md transition">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-lg">{task.title}</CardTitle>

              <Badge
                variant={
                  task.status === "completed"
                    ? "default"
                    : task.status === "in_progress"
                      ? "secondary"
                      : "outline"
                }
              >
                {task.status.replace("_", " ")}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Assignee */}
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>
                    {task.assignee.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">
                  {task.assignee?.name}
                </span>
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <Progress value={task.progress} />
              </div>

              {/* Deadline */}
              <div className="text-sm text-gray-500">
                Deadline: {task.deadline}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
