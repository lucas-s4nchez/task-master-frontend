import { ITask } from "../../../models/data";

interface IUpdateTasksLists {
  currentTask: ITask;
  setToDoTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  setInProgressTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  setCompletedTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  sourceDroppableId: string;
  destinationDroppableId: string;
  destinationIndex: number;
}

export const handleTaskListUpdate = ({
  currentTask,
  setToDoTasks,
  setInProgressTasks,
  setCompletedTasks,
  sourceDroppableId,
  destinationDroppableId,
  destinationIndex,
}: IUpdateTasksLists): void => {
  if (destinationDroppableId === "to do") {
    setToDoTasks((prevTasks) => {
      prevTasks.splice(destinationIndex, 0, currentTask);
      return prevTasks;
    });
  }
  if (destinationDroppableId === "in progress") {
    setInProgressTasks((prevTasks) => {
      prevTasks.splice(destinationIndex, 0, currentTask);
      return prevTasks;
    });
  }
  if (destinationDroppableId === "done") {
    setCompletedTasks((prevTasks) => {
      prevTasks.splice(destinationIndex, 0, currentTask);
      return prevTasks;
    });
  }

  if (sourceDroppableId === "to do") {
    setToDoTasks((prevTasks) => {
      return prevTasks.filter((task) => task._id !== currentTask._id);
    });
  }
  if (sourceDroppableId === "in progress") {
    setInProgressTasks((prevTasks) => {
      return prevTasks.filter((task) => task._id !== currentTask._id);
    });
  }
  if (sourceDroppableId === "done") {
    setCompletedTasks((prevTasks) => {
      return prevTasks.filter((task) => task._id !== currentTask._id);
    });
  }
};
