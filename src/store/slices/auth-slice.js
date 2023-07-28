import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  isLoggedIn: false,
  username: "",
  displayName: "",
  image: "",
  password: "",
};

const authSlice = createSlice({
  name: "authInfo",
  initialState: defaultState,
  reducers: {
    onLoginSuccess(state, action) {
      console.log(action.payload);
      return { ...state, ...action.payload };
    },
    onUpdateSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    onLogoutSuccess(state, action) {
      return defaultState;
    },
  },
});

export const { onLoginSuccess, onLogoutSuccess, onUpdateSuccess } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
