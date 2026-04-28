"use client";

import React from "react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../common/dialog";

import TaskForm from "./TaskForm";

import { useUpdateTaskMutation } from "../../services/taskes/task.api";

function UpdateTaskModal({ open, setOpen, selectedTask }) {
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  if (!selectedTask) return null; // ✅ prevent crash

  const handleSubmit = async (payload) => {
    try {
      const res = await updateTask({
        id: selectedTask._id,
        data: payload,
      }).unwrap();

      toast.success(res.message || "Updated");
      setOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
        </DialogHeader>

        <TaskForm
          mode="update"
          defaultValues={selectedTask}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

export default UpdateTaskModal;
