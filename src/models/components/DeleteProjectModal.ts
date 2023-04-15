import { IAddProjectModalProps } from "./";

export interface IDeleteProjectModalProps extends IAddProjectModalProps {
  projectId: string;
  projectTitle: string;
}
