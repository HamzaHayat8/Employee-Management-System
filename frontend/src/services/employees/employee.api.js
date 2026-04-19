import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/employee/",
    credentials: "include",
  }),

  // ✅ STEP 1: define tags
  tagTypes: ["Employee"],

  endpoints: (builder) => ({
    // ✅ GET
    getEmployees: builder.query({
      query: () => "getEmployee",

      // ✅ STEP 2: provide tags
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

    // ✅ UPDATE
    updateEmployee: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `updateEmployee/${id}`,
        method: "PUT",
        body: data,
      }),

      // ✅ STEP 3: invalidate
      invalidatesTags: (result, error, { id }) => [
        { type: "Employee", id },
        { type: "Employee", id: "LIST" },
      ],
    }),

    // ✅ DELETE
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
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} = employeeApi;
