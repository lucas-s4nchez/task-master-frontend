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
  projectCollaborators: ICollaborator[];
}
export interface IAddProjectButtonProps {
  handleOpenModal: () => void;
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
  projectCollaborators: ICollaborator[];
  isOpenModal: boolean;
  handleCloseModal: () => void;
}
export interface IUpdateTaskModalProps {
  projectId: string;
  isOpenModal: boolean;
  handleCloseModal: () => void;
}
export interface IDeleteTaskModalProps extends IUpdateTaskModalProps {
  handleToggleTask: () => void;
}
