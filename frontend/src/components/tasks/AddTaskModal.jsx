"use client";

import React from "react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../common/dialog";

import { Button } from "../common/button";

import TaskForm from "./TaskForm";

import { useCreateTaskMutation } from "../../services/taskes/task.api";
import { useGetEmployeesQuery } from "../../services/employees/employee.api";

function AddTaskModal() {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const { data, isLoading: empLoading } = useGetEmployeesQuery();

  
  
  // ✅ SAFE extraction
  const employees = data?.data || [];
  // console.log("Employees data:", employees); // ✅ Debug log

  const handleSubmit = async (payload) => {
    try {
      const res = await createTask(payload).unwrap();
      toast.success(res.message || "Task Created");
    } catch (err) {
      toast.error(err?.data?.message || "Failed");
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
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <TaskForm
          mode="create"
          employees={employees}
          isLoading={isLoading || empLoading}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskModal;
