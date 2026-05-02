// src/services/attendance/attendanceApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/attendance", // Change if your backend is on different URL
    credentials: "include", // Include cookies for auth
  }),

  tagTypes: ["Attendance"],

  endpoints: (builder) => ({
    // Check In with GPS + Face
    checkIn: builder.mutation({
      query: (body) => ({
        url: "/checkin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),

    // Check Out
    checkOut: builder.mutation({
      query: (body) => ({
        url: "/checkout",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),

    // Get My Attendance (for current employee)
    getMyAttendance: builder.query({
      query: () => "/my-attendance",
      providesTags: ["Attendance"],
    }),

    // Get Today's Attendance Status
    getTodayAttendance: builder.query({
      query: () => "/today",
      providesTags: ["Attendance"],
    }),
  }),
});

export const {
  useCheckInMutation,
  useCheckOutMutation,
  useGetMyAttendanceQuery,
  useGetTodayAttendanceQuery,
} = attendanceApi;
