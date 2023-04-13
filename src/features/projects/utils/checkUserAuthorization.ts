import { toast } from "sonner";
import { ITask } from "../../../models/data";

interface ICheckUserAuthorizationToUpdateTask {
  currentTask: ITask;
  uid: string;
  projectCreatorId: string;
}

export const checkUserAuthorizationToUpdateTask = ({
  currentTask,
  uid,
  projectCreatorId,
}: ICheckUserAuthorizationToUpdateTask): boolean => {
  const isTaskAuthor: boolean = currentTask.author._id === uid;
  const isTaskAssignedUser: boolean = currentTask.assignedTo.some(
    (user) => user._id === uid
  );
  const isProjectCreator: boolean = projectCreatorId === uid;

  const userAuthorizedToUpdateTask: boolean =
    isProjectCreator || isTaskAuthor || isTaskAssignedUser;
  if (!userAuthorizedToUpdateTask) {
    toast.error(
      "No puedes realizar esta acción, no eres el autor o un usuario asignado de la tarea"
    );
    return false;
  }
  return true;
};
