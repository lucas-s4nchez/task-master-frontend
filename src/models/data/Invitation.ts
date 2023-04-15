import { IProjectUser } from "./";

export interface IInvitation {
  _id: string;
  title: string;
  creator: IProjectUser;
}
