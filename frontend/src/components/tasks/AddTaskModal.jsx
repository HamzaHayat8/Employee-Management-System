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

export default function AddTaskModal() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "pending",
    priority: "medium",
    deadline: "",
    progress: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Data:", task);

    setTask({
      title: "",
      description: "",
      assignedTo: "",
      status: "pending",
      priority: "medium",
      deadline: "",
      progress: 0,
    });
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
                value={task.assignedTo}
                onValueChange={(value) =>
                  handleSelectChange("assignedTo", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ali">Ali</SelectItem>
                  <SelectItem value="ahmed">Ahmed</SelectItem>
                  <SelectItem value="sara">Sara</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Deadline</Label>
              <Input
                type="date"
                name="deadline"
                value={task.deadline}
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
                <SelectContent >
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
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
              name="progress"
              value={task.progress}
              onChange={handleChange}
              min={0}
              max={100}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
