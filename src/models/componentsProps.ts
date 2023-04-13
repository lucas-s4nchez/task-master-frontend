import { ChangeEvent } from "react";
import { ICollaborator, ITask } from "./data";

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
  projectCreatorId: string;
}
export interface IAddCollaboratorModalProps {
  projectId: string;
  isOpenModal: boolean;
  handleCloseModal: () => void;
}
export interface IDeleteCollaboratorModalProps
  extends IAddCollaboratorModalProps {
  userId: string;
  email: string;
}
export interface IAddProjectModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
}
export interface IDeleteProjectModalProps extends IAddProjectModalProps {
  projectId: string;
  projectTitle: string;
}
export interface IUpdateProjectModalProps extends IAddProjectModalProps {
  projectId: string;
  title: string;
  description: string;
}
export interface IAddTaskModalProps {
  projectId: string;
  isOpenModal: boolean;
  handleCloseModal: () => void;
}
export interface IUpdateTaskModalProps {
  task: ITask;
  isOpenModal: boolean;
  handleCloseModal: () => void;
}
export interface IDeleteTaskModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  handleToggleTask: () => void;
}
export interface ICollaboratorsDropdownMenu {
  value: string[];
  handleChange: (eventOrPath: string | ChangeEvent<any>) => void;
  isError: boolean | undefined;
  errorMessage: string[] | string | undefined;
}
