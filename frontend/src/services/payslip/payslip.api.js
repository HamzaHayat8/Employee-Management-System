import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const payslipApi = createApi({
  reducerPath: "payslipApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/payslip/",
    credentials: "include",
  }),
  tagTypes: ["Payslip"],
  endpoints: (builder) => ({
    generatePayslip: builder.mutation({
      query: (data) => ({
        url: "generate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payslip"],
    }),
    getPayslip: builder.query({
      query: () => "",
      providesTags: ["Payslip"],
    }),
    getbyId: builder.query({
      query: (_id) => `print/${_id}`,
      providesTags: ["Payslip"],
    }),
    getAllPayslips: builder.query({
      query: () => "all",
      providesTags: ["Payslip"],
    }),
  }),
});

export const {
  useGeneratePayslipMutation,
  useGetPayslipQuery,
  useGetbyIdQuery,
  useGetAllPayslipsQuery,
} = payslipApi;
