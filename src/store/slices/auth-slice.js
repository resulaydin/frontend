import { createSlice, current } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authInfo",
  initialState: {
    isLoggedIn: false,
    username: "",
    displayName: "",
    image: "",
    password: "",
  },
  reducers: {
    onChangeStateSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    onLoginSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    onUpdateSuccess(state, action) {
      return { ...state, ...action.payload };
    },

    onLogoutSuccess(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  onLoginSuccess,
  onLogoutSuccess,
  onChangeStateSuccess,
  onUpdateSuccess,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
