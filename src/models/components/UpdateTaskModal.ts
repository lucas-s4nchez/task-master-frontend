import { ITask } from "../data";

export interface IUpdateTaskModalProps {
  task: ITask;
  isOpenModal: boolean;
  handleCloseModal: () => void;
}
