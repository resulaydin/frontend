import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  username: "",
  displayName: "",
  image: "",
  password: "",
};

const authSlice = createSlice({
  name: "authInfo",
  initialState,
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
      return initialState;
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
