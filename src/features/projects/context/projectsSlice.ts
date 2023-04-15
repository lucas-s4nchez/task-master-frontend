import { createSlice } from "@reduxjs/toolkit";
import { IProjectsSliceInitialState } from "../../../models/store/projects";

const initialState: IProjectsSliceInitialState = {
  activeProject: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    onSetActiveProject: (state, { payload }) => {
      state.activeProject = payload;
    },
    onClearActiveProject: (state) => {
      state.activeProject = null;
    },
  },
});

export const { onSetActiveProject, onClearActiveProject } =
  projectsSlice.actions;

export default projectsSlice.reducer;
