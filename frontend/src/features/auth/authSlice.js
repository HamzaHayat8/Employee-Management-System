// features/auth/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login
    setCredentials: (state, action) => {
      state.user = action.payload.employee;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    // Update only user profile
    updateUser: (state, action) => {
      state.user = action.payload;
    },

    // Logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
