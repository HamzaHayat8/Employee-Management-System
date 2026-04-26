"use client";

/* ===============================
   UpdateTaskModal.jsx
================================= */

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../common/dialog";

import { Button } from "../common/button";
import { Input } from "../common/input";
import { Label } from "../common/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../common/select";

import { useUpdateTaskMutation } from "../../services/taskes/task.api";

export default function UpdateTaskModal({ open, setOpen, selectedTask }) {
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const [task, setTask] = useState({
    status: "pending",
    Progress: 0,
  });

  useEffect(() => {
    if (selectedTask) {
      setTask({
        status: selectedTask.status || "pending",
        Progress: selectedTask.Progress || 0,
      });
    }
  }, [selectedTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateTask({
        id: selectedTask._id,
        data: task,
      }).unwrap();

      toast.success(res.message || "Updated Successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>

            <Select
              value={task.status}
              onValueChange={(value) => setTask({ ...task, status: value })}
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
          <div className="space-y-2">
            <Label>Progress</Label>

            <Input
              type="number"
              min={0}
              max={100}
              value={task.Progress}
              onChange={(e) =>
                setTask({
                  ...task,
                  Progress: Number(e.target.value),
                })
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            {isLoading ? "Updating..." : "Update Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
