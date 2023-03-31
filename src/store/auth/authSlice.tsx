import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthSliceInitialState, ILoginPayload } from "../interfaces";

const initialState: IAuthSliceInitialState = {
  status: "checking",
  token: null,
  username: null,
  email: null,
  uid: null,
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
      state.uid = null;
    },
    onLogin: (state, { payload }: PayloadAction<ILoginPayload>) => {
      state.status = "authenticated";
      state.token = payload.token;
      state.username = payload.username;
      state.email = payload.email;
      state.uid = payload.uid;
    },
    onLogout: (state) => {
      state.status = "not-authenticated";
      state.token = null;
      state.username = null;
      state.email = null;
      state.uid = null;
    },
  },
});

export const { onCheckingCredentials, onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
