import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authInfo",
  initialState: {
    isLoggedIn: false,
    userInfo: {
      username: "",
      dislayName: "",
      image: "",
      password: "",
    },
  },
  reducers: {
    onChangeStateSuccess(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userInfo = action.payload.userInfo;
    },
    onLoginSuccess(state, action) {
      state.userInfo = action.payload.userInfo;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    onLogoutSuccess(state, action) {
      state.userInfo = action.payload.userInfo;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const { onLoginSuccess, onLogoutSuccess, onChangeStateSuccess } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
