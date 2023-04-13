import { IProject, ITask } from "./data";

export interface IUiSliceInitialState {
  themeMode: string;
  isOpenMenu: boolean;
  isOpenTask: boolean;
}
export interface IAuthSliceInitialState {
  status: "checking" | "authenticated" | "not-authenticated";
  token: string | null;
  username: string | null;
  email: string | null;
  uid: string | null;
}
export interface ITasksInitialState {
  activeTask: ITask | null;
}
export interface IProjectsSliceInitialState {
  activeProject: IProject | null;
}
export interface ILoginPayload {
  token: string;
  username: string;
  email: string;
  uid: string;
}
