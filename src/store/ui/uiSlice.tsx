import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: localStorage.theme || "light",
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
  },
});

export const { onDarkMode, onLightMode } = uiSlice.actions;

export default uiSlice.reducer;
