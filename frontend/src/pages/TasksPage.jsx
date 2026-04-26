"use client";

/* ===============================
   TasksPage.jsx
================================= */

import React from "react";

import Loader from "../components/common/Loading";
import AddTaskModal from "../components/tasks/AddTaskModal";
import UpdateTaskModal from "../components/tasks/UpdateTaskModal";

import { Progress } from "../components/common/progress";
import { Badge } from "../components/common/badge";
import { getDeadlineInfo } from "../utils/DeadlineInfo";

import { useGetEmployeeTasksQuery } from "../services/taskes/task.api";

import { ClipboardList, CheckCircle, Clock, Activity } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TasksPage() {
  const { data: taskResponse, isLoading } = useGetEmployeeTasksQuery();

  const [tasks, setTasks] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState(null);

  React.useEffect(() => {
    setTasks(taskResponse?.tasks || []);
  }, [taskResponse]);

  if (isLoading) return <Loader />;

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (item) => item.status === "completed",
  ).length;

  const pendingTasks = tasks.filter((item) => item.status === "pending").length;

  const inProgressTasks = tasks.filter(
    (item) => item.status === "in-progress",
  ).length;

  const chartData = [
    { name: "Pending", value: pendingTasks },
    { name: "In Progress", value: inProgressTasks },
    { name: "Completed", value: completedTasks },
  ];

  const priorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const handleOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Task Management</h1>
          <p className="text-sm text-gray-500">Track and manage tasks</p>
        </div>

        <AddTaskModal />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total"
          count={totalTasks}
          icon={<ClipboardList size={18} />}
        />

        <StatCard
          title="Completed"
          count={completedTasks}
          icon={<CheckCircle size={18} />}
        />

        <StatCard
          title="Pending"
          count={pendingTasks}
          icon={<Clock size={18} />}
        />

        <StatCard
          title="Progress"
          count={inProgressTasks}
          icon={<Activity size={18} />}
        />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border p-5">
        <h2 className="font-semibold mb-4">Task Analytics</h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tasks Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => {
          const deadline = getDeadlineInfo(task.dueDate);
          return (
            <div
              key={task._id}
              onClick={() => handleOpen(task)}
              className="p-4 border rounded-xl bg-white cursor-pointer hover:shadow-lg transition space-y-4"
            >
              <div className="flex justify-between">
                <h2 className="font-semibold text-sm">{task.title}</h2>

                <Badge>{task.status}</Badge>
              </div>

              <div className="flex justify-end">
                <Badge
                  className="text-white"
                  style={{
                    backgroundColor: priorityColor(task.priority),
                  }}
                >
                  {task.priority}
                </Badge>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{task.Progress}%</span>
                </div>

                <Progress value={task.Progress} />
              </div>

              {/* Deadline */}
              <p
                className={`text-xs ${deadline.isOverdue ? "text-red-600 font-medium" : "text-gray-500"}`}
              >
                Deadline:
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "N/A"}{" "}
                {task.dueDate || task.s && (
                  <span className="ml-1">({deadline.text})</span>
                )}
              </p>
            </div>
          );
        })}
      </div>

      {/* Update Modal */}
      <UpdateTaskModal
        open={open}
        setOpen={setOpen}
        selectedTask={selectedTask}
      />
    </div>
  );
}

/* ===============================
   Stat Card
================================= */

function StatCard({ title, count, icon }) {
  return (
    <div className="p-4 rounded-xl border bg-white flex items-center gap-3">
      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">{icon}</div>

      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="font-semibold text-lg">{count}</p>
      </div>
    </div>
  );
}
