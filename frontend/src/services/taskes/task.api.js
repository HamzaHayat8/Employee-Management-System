"use client";

/* ===============================
   task.api.js
================================= */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/task/",
    credentials: "include",
  }),

  tagTypes: ["Task"],

  endpoints: (builder) => ({
    // Create Task
    createTask: builder.mutation({
      query: (data) => ({
        url: "create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),

    // Get Employee Tasks
    getEmployeeTasks: builder.query({
      query: () => "empl",
      providesTags: ["Task"],
    }),

    // Update Task
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),

    // Get All Tasks (Admin)
    getAllTasks: builder.query({
      query: () => "all",
      providesTags: ["Task"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetEmployeeTasksQuery,
  useUpdateTaskMutation,
  useGetAllTasksQuery,
} = taskApi;
