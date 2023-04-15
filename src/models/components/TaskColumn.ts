import { ITask } from "../data";

export interface ITaskColumnProps {
  droppableId: "to do" | "in progress" | "done";
  taskList: ITask[];
}
