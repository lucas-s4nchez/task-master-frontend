import { IAddCollaboratorModalProps } from "./";

export interface IDeleteCollaboratorModalProps
  extends IAddCollaboratorModalProps {
  userId: string;
  email: string;
}
