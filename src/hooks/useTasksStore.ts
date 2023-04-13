import { ITask } from "../models/data";
import {
  onClearActiveTask,
  onSetActiveTask,
} from "../features/projects/context/tasksSlice";
import { useAppDispatch, useAppSelector } from "./store";

export const useTasksStore = () => {
  const { activeTask } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const handleSetActiveTask = (task: ITask) => {
    dispatch(onSetActiveTask(task));
  };
  const handleClearActiveTask = () => {
    dispatch(onClearActiveTask());
  };

  return { activeTask, handleSetActiveTask, handleClearActiveTask };
};
