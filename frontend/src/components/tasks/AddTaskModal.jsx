"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../common/dialog";

import { Input } from "../common/input";
import { Textarea } from "../common/textarea";
import { Button } from "../common/button";

import { Label } from "../common/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../common/select";
import { useCreateTaskMutation } from "../../services/taskes/task.api";
import { useGetEmployeesQuery } from "../../services/employees/employee.api";
import toast from "react-hot-toast";

export default function AddTaskModal() {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const { data: userdata } = useGetEmployeesQuery();

  const [task, setTask] = useState({
    title: "",
    description: "",
    employeeId: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
    Progress: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...task,
        Progress: Number(task.Progress), // ensure number
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null,
      };
      const res = await createTask(payload).unwrap();
      toast.success(res.message || "Task created successfully");
      console.log("Task created:", res);
      setTask({
        title: "",
        description: "",
        employeeId: "",
        status: "pending",
        priority: "medium",
        dueDate: "",
        Progress: 0,
      });
    } catch (err) {
      console.error("Create task failed:", err);
      toast.error(err.message || "Failed to create task.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          + Add Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label>Task Title</Label>
            <Input
              name="title"
              placeholder="Enter task title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Write task details..."
              value={task.description}
              onChange={handleChange}
            />
          </div>

          {/* Assign + Deadline */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Assign To</Label>
              <Select
                value={task.employeeId}
                onValueChange={(value) =>
                  handleSelectChange("employeeId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {userdata?.data?.map((employee) => (
                    <SelectItem key={employee._id} value={employee._id}>
                      {employee.first_name} {employee.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Deadline</Label>
              <Input
                type="date"
                name="dueDate"
                value={task.dueDate ? task.dueDate.split("T")[0] : ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={task.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={task.priority}
                onValueChange={(value) => handleSelectChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🟢 Low</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="high">🔴 High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <Label>Progress (%)</Label>
            <Input
              type="number"
              name="Progress"
              value={task.Progress}
              onChange={handleChange}
              min={0}
              max={100}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isLoading ? "Creating..." : "Create Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
