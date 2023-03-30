import { createSlice } from "@reduxjs/toolkit";
import { IAuthSliceInitialState } from "../interfaces";

const initialState: IAuthSliceInitialState = {
  status: "checking",
  token: null,
  username: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onCheckingCredentials: (state) => {
      state.status = "checking";
      state.token = null;
      state.username = null;
      state.email = null;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.token = payload.token;
      state.username = payload.username;
      state.email = payload.email;
    },
    onLogout: (state) => {
      state.status = "not-authenticated";
      state.token = null;
      state.username = null;
      state.email = null;
    },
  },
});

export const { onCheckingCredentials, onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
