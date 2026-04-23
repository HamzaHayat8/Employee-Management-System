import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
  reducerPath: "employeesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/employee/",
    credentials: "include",
  }),

  tagTypes: ["Employee"],

  endpoints: (builder) => ({
    // GET employees
    getEmployees: builder.query({
      query: () => "getEmployee",
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((emp) => ({
                type: "Employee",
                id: emp._id,
              })),
              { type: "Employee", id: "LIST" },
            ]
          : [{ type: "Employee", id: "LIST" }],
    }),

    // UPDATE employee
    updateEmployee: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `updateEmployee/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Employee", id },
        { type: "Employee", id: "LIST" },
      ],
    }),

    // DELETE employee
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `deleteEmployee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Employee", id },
        { type: "Employee", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
