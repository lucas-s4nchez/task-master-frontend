import { useEffect } from "react";
import { toast } from "sonner";
import { Button, Modal } from "../../ui/components";
import { useProjectsStore, useTasksStore } from "../../../hooks";
import { useDeleteTaskMutation } from "../services/tasksApi";
import { IDeleteTaskModalProps } from "../../../models/components";
import { ICustomFetchBaseQueryError } from "../../../models/store/error";

export const DeleteTaskModal: React.FC<IDeleteTaskModalProps> = ({
  isOpenModal,
  handleCloseModal,
  handleToggleTask,
}: IDeleteTaskModalProps) => {
  const { activeTask } = useTasksStore();
  const { activeProject } = useProjectsStore();
  const [deleteTask, { data, isLoading, isSuccess, isError, error }] =
    useDeleteTaskMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg);
      handleCloseModal();
      handleToggleTask();
    }
    if (isError) {
      toast.error((error as ICustomFetchBaseQueryError).data?.msg);
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Modal isOpenModal={isOpenModal} handleCloseModal={handleCloseModal}>
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-dark-300 dark:text-light-100">
          ¿Deseas eliminar la tarea:{" "}
          <span className="font-semibold">"{activeTask?.title}"</span>?
        </h2>
        <div className="flex gap-2 justify-center">
          <Button
            size="medium"
            bgColor="primary"
            disabled={isLoading}
            onClick={handleCloseModal}
          >
            Cancelar
          </Button>
          <Button
            size="medium"
            bgColor="red"
            disabled={isLoading}
            onClick={() =>
              deleteTask({ projectId: activeProject?._id, id: activeTask?._id })
            }
          >
            Eliminar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
