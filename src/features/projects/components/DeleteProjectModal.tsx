import { useEffect } from "react";
import { toast } from "sonner";
import { Button, Loader, Modal } from "../../ui/components";
import { IDeleteProjectModalProps } from "../../../models/componentsProps";
import { ICustomFetchBaseQueryError } from "../../../models/data";
import { useNavigate } from "react-router-dom";
import { useDeleteProjectMutation } from "../services/projectsApi";

export const DeleteProjectModal: React.FC<IDeleteProjectModalProps> = ({
  projectId,
  projectTitle,
  isOpenModal,
  handleCloseModal,
}: IDeleteProjectModalProps) => {
  const navigate = useNavigate();
  const [deleteProject, { data, isLoading, isSuccess, isError, error }] =
    useDeleteProjectMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg);
      handleCloseModal();
      navigate("/", { replace: true });
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
          ¿Deseas eliminar el proyecto:{" "}
          <span className="font-semibold">"{projectTitle}"</span>?
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
            onClick={() => deleteProject(projectId)}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
