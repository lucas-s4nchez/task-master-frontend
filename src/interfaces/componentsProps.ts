import { ITask } from "./data";

export interface IAuthLayoutProps {
  children: React.ReactNode;
  title: string;
}
export interface IChildrenProps {
  children: React.ReactNode;
}
export interface ITaskColumnProps {
  droppableId: "to do" | "in progress" | "done";
  taskList: ITask[];
}
export interface ITaskContainerProps {
  tasks: ITask[];
  projectId: string;
}
