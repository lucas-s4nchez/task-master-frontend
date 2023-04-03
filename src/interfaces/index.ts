export interface ICustomFetchBaseQueryError {
  status: number;
  data?: {
    ok?: boolean;
    msg: string;
  };
  error?: string;
}
export interface IUser {
  ok: boolean;
  uid: string;
  username: string;
  email: string;
  token: string;
}
export interface ILoginCredentials {
  email: string;
  password: string;
}
export interface IRegisterCredentials {
  email: string;
  password: string;
  username: string;
}
export interface IUserProject {
  _id: string;
  username: string;
  email: string;
}
export interface ICollaborator {
  _id: string;
  role: "admin" | "collaborator";
  user: IUserProject;
}
export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: "to do" | "in progress" | "done";
  author: IUserProject;
  assignedTo: IUserProject[];
  __v: number;
}
export interface IProject {
  _id: string;
  title: string;
  description: string;
  creator: IUserProject;
  collaborators: ICollaborator[];
  invitations: IUserProject[];
  tasks: ITask[];
  __v: number;
}
//Components
export interface IChildrenProps {
  children: React.ReactNode;
}
export interface ITaskColumnProps {
  droppableId: "to do" | "in progress" | "done";
  taskList: ITask[];
}
export interface ITaskContainerProps {
  toDoTasks: ITask[];
  inProgressTasks: ITask[];
  completedTasks: ITask[];
}
