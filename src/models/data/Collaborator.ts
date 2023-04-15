import { IProjectUser } from "./";

export interface ICollaborator {
  _id: string;
  role: "admin" | "collaborator";
  user: IProjectUser;
}
