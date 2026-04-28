"use client";

import React, { useState, useEffect } from "react";
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

export default function TaskForm({
  defaultValues,
  onSubmit,
  isLoading,
  employees = [],
  mode = "create",
}) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    employeeId: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
    Progress: 0,
  });

  useEffect(() => {
    if (defaultValues) {
      setTask({
        ...defaultValues,
        dueDate: defaultValues.dueDate
          ? new Date(defaultValues.dueDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const payload = {
      ...task,
      Progress: Number(task.Progress),
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null,
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={submitHandler} className="space-y-5">
      {/* Title */}
      <div className="space-y-2">
        <Label>Task Title</Label>
        <Input
          name="title"
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
          value={task.description}
          onChange={handleChange}
        />
      </div>

      {/* CREATE ONLY */}
      {mode === "create" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Assign To</Label>
            <Select
              value={task.employeeId}
              onValueChange={(val) => handleSelectChange("employeeId", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>

              <SelectContent>
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <SelectItem key={emp._id} value={emp._id}>
                      {emp.first_name} {emp.last_name}
                    </SelectItem>
                  ))
                ) : (
                  <p className="p-2 text-sm text-gray-400">
                    No employees found
                  </p>
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Deadline</Label>
            <Input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      {/* Status */}
      <div>
        <Label>Status</Label>
        <Select
          value={task.status}
          onValueChange={(val) => handleSelectChange("status", val)}
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

      {/* Progress */}
      <div>
        <Label>Progress</Label>
        <Input
          type="number"
          min={0}
          max={100}
          value={task.Progress}
          onChange={(e) => setTask({ ...task, Progress: e.target.value })}
        />
      </div>

      <Button type="submit" className="w-full">
        {isLoading
          ? mode === "create"
            ? "Creating..."
            : "Updating..."
          : mode === "create"
            ? "Create Task"
            : "Update Task"}
      </Button>
    </form>
  );
}
