import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../../models/data";
import { ITasksInitialState } from "../../../models/store/tasks";

const initialState: ITasksInitialState = {
  activeTask: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    onSetActiveTask: (state, { payload }: PayloadAction<ITask>) => {
      state.activeTask = payload;
    },
    onClearActiveTask: (state) => {
      state.activeTask = null;
    },
  },
});

export const { onSetActiveTask, onClearActiveTask } = tasksSlice.actions;

export default tasksSlice.reducer;
