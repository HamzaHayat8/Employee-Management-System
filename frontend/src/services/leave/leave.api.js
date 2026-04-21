import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const leaveApi = createApi({
  reducerPath: "leaveApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/leave/",
    credentials: "include",
  }),
  tagTypes: ["Leave"],
  endpoints: (builder) => ({
    addLeave: builder.mutation({
      query: (data) => ({
        url: "apply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Leave"],
    }),
    getemployeeLeaves: builder.query({
      query: () => "leaves",
      providesTags: ["Leave"],
    }),
    getAllLeaves: builder.query({
      query: () => "all",
      providesTags: ["Leave"],
    }),
    updateLeaveStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Leave"],
    }),
  }),
});

export const {
  useAddLeaveMutation,
  useGetemployeeLeavesQuery,
  useGetAllLeavesQuery,
  useUpdateLeaveStatusMutation,
} = leaveApi;
