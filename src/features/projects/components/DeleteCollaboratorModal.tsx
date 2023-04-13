import { useEffect } from "react";
import { toast } from "sonner";
import { Button, Loader, Modal } from "../../ui/components";
import { ICustomFetchBaseQueryError } from "../../../models/data";
import { IDeleteCollaboratorModalProps } from "../../../models/componentsProps";
import { useDeleteProjectCollaboratorMutation } from "../services/projectsApi";

export const DeleteCollaboratorModal: React.FC<
  IDeleteCollaboratorModalProps
> = ({
  projectId,
  userId,
  email,
  isOpenModal,
  handleCloseModal,
}: IDeleteCollaboratorModalProps) => {
  const [deleteCollaborator, { isLoading, isSuccess, data, isError, error }] =
    useDeleteProjectCollaboratorMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg);
      handleCloseModal();
    }
    if (isError) {
      toast.error((error as ICustomFetchBaseQueryError).data?.msg);
    }
  }, [isSuccess, isError, error]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <Modal isOpenModal={isOpenModal} handleCloseModal={handleCloseModal}>
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-dark-300 dark:text-light-100">
          ¿Deseas eliminar del proyecto al usuario:{" "}
          <span className="font-semibold">"{email}"</span>?
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
              deleteCollaborator({ projectId: projectId, userId: userId })
            }
          >
            Eliminar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
