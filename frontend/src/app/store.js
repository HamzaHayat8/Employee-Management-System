// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { authApi } from "../services/auth/authApi";
import { employeeApi } from "../services/employees/employee.api";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const realStorage = storage.default || storage;

const persistConfig = {
  key: "auth",
  storage: realStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, employeeApi.middleware),
});

export const persistor = persistStore(store);
