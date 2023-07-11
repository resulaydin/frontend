import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth-slice";

export const store = configureStore({
  reducer: {
    authStore: authReducer,
  },
});
