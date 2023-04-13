import { createSlice } from "@reduxjs/toolkit";
import { IUiSliceInitialState } from "../../../models/store";

const initialState: IUiSliceInitialState = {
  themeMode: localStorage.theme || "light",
  isOpenMenu: false,
  isOpenTask: false,
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
    onToggleTask: (state) => {
      state.isOpenTask = !state.isOpenTask;
    },
  },
});

export const { onDarkMode, onLightMode, onToggleMenu, onToggleTask } =
  uiSlice.actions;

export default uiSlice.reducer;
