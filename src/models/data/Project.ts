import { ITask, ICollaborator, IProjectUser } from "./";

export interface IProject {
  _id: string;
  title: string;
  description: string;
  creator: IProjectUser;
  collaborators: ICollaborator[];
  invitations: IProjectUser[];
  tasks: ITask[];
  __v: number;
}
