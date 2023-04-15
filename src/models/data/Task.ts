import { IProjectUser } from "./";
export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: "to do" | "in progress" | "done";
  author: IProjectUser;
  assignedTo: IProjectUser[];
  __v: number;
}
