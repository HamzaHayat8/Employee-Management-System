import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/task/",
    credentials: "include",
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        url: "create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    getTasks: builder.query({
      query: () => "all",
      providesTags: ["Task"],
    }),
    getTask: builder.query({
      query: (_id) => `print/${_id}`,
      providesTags: ["Task"],
    }),
  }),
});

export const { useGetTasksQuery, useGetTaskQuery, useCreateTaskMutation } = taskApi;

export default taskApi;
