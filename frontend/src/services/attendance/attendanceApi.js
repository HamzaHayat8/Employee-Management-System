// src/services/attendance/attendanceApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api", // Change if your backend is on different URL
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token; // Assuming you have auth slice with token
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Attendance"],

  endpoints: (builder) => ({
    // Check In with GPS + Face
    checkIn: builder.mutation({
      query: (body) => ({
        url: "/attendance/checkin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),

    // Check Out
    checkOut: builder.mutation({
      query: (body) => ({
        url: "/attendance/checkout",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),

    // Get My Attendance (for current employee)
    getMyAttendance: builder.query({
      query: () => "/attendance/my-attendance",
      providesTags: ["Attendance"],
    }),

    // Get Today's Attendance Status
    getTodayAttendance: builder.query({
      query: () => "/attendance/today",
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
