import { IAddProjectModalProps } from "./";

export interface IUpdateProjectModalProps extends IAddProjectModalProps {
  projectId: string;
  title: string;
  description: string;
}
