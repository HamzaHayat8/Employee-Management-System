import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    // Fetch Employees
    fetchEmployeesStart: (state, action) => {
      console.log(action.payload?.data);
      state.employees = action.payload?.data || [];
      state.loading = true;
    },
  },
});

export const { fetchEmployeesStart } = employeeSlice.actions;
export default employeeSlice.reducer;
