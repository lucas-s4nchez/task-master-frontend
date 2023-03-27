import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  token: null,
  status: "checking",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onCheckingCredentials: (state) => {
      state.username = null;
      state.token = null;
      state.status = "checking";
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.username = payload.username;
      state.token = payload.token;
    },
    onLogout: (state) => {
      state.status = "not-authenticated";
      state.username = null;
      state.token = null;
    },
  },
});

export const { onCheckingCredentials, onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
