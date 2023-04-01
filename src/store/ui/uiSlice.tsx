import { createSlice } from "@reduxjs/toolkit";
import { IUiSliceInitialState } from "../interfaces";

const initialState: IUiSliceInitialState = {
  themeMode: localStorage.theme || "light",
  isOpenMenu: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    onDarkMode: (state) => {
      state.themeMode = "dark";
      localStorage.theme = "dark";
    },
    onLightMode: (state) => {
      state.themeMode = "light";
      localStorage.theme = "light";
    },
    onToggleMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
  },
});

export const { onDarkMode, onLightMode, onToggleMenu } = uiSlice.actions;

export default uiSlice.reducer;
