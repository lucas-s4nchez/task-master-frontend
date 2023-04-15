import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button, UserAvatar } from "../../ui/components";
import {
  UpdateProjectModal,
  DeleteProjectModal,
  AddCollaboratorModal,
} from "../components";
import { useAuthStore } from "../../../hooks";
import { useModal } from "../../ui/hooks/useModal";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdDelete, MdEdit } from "react-icons/md";
import { FiUserX } from "react-icons/fi";
import { DeleteCollaboratorModal } from "../components/DeleteCollaboratorModal";
import { useEffect, useState } from "react";
import {
  useCancelProjectInvitationMutation,
  useGetProjectByIdQuery,
} from "../services/projectsApi";
import { FloatingActionButton } from "../../ui/components/FloatingActionButton";
import { ICustomFetchBaseQueryError } from "../../../models/store/error";

export const ProjectInfo = () => {
  const { id } = useParams();
  const { uid } = useAuthStore();
  const {
    isOpenModal: isOpenAddCollaboratorModal,
    handleOpenModal: handleOpenAddCollaboratorModal,
    handleCloseModal: handleCloseAddCollaboratorModal,
  } = useModal();
  const {
    isOpenModal: isOpenDeleteCollaboratorModal,
    handleOpenModal: handleOpenDeleteCollaboratorModal,
    handleCloseModal: handleCloseDeleteCollaboratorModal,
  } = useModal();
  const {
    isOpenModal: isOpenDeleteProjectModal,
    handleOpenModal: handleOpenDeleteProjectModal,
    handleCloseModal: handleCloseDeleteProjectModal,
  } = useModal();
  const {
    isOpenModal: isOpenUpdateProjectModal,
    handleOpenModal: handleOpenUpdateProjectModal,
    handleCloseModal: handleCloseUpdateProjectModal,
  } = useModal();
  const {
    data: project,
    isLoading: isLoadingProject,
    isError: isErrorProject,
    error: errorProject,
  } = useGetProjectByIdQuery(id!, {
    refetchOnFocus: true,
  });
  const [
    cancelInvitation,
    {
      data: cancelInvitationData,
      isSuccess: cancelInvitationIsSuccess,
      error: cancelInvitationError,
      isError: cancelInvitationIsError,
    },
  ] = useCancelProjectInvitationMutation();

  const [selectedUser, setSelectedUser] = useState({
    userId: "",
    email: "",
  });

  useEffect(() => {
    if (cancelInvitationIsSuccess) {
      toast.success(cancelInvitationData.msg);
    }
    if (cancelInvitationIsError) {
      toast.error(
        (cancelInvitationError as ICustomFetchBaseQueryError).data?.msg
      );
    }
  }, [
    cancelInvitationData,
    cancelInvitationIsSuccess,
    cancelInvitationError,
    cancelInvitationIsError,
  ]);

  if (isLoadingProject) {
    return null;
  }
  if (isErrorProject) {
    return <h1>{(errorProject as ICustomFetchBaseQueryError).data?.msg}</h1>;
  }
  return (
    <div>
      <div className="flex flex-col gap-2 p-5 bg-light-100 dark:bg-dark-300 rounded-b-md rounded-r-md mb-5 text-dark-300 dark:text-light-100">
        <h1 className="text-3xl font-semibold">{project?.project.title}</h1>
        <h2>{project?.project.description}</h2>
        {uid === project?.project.creator._id && (
          <div>
            <FloatingActionButton
              title="Editar proyecto"
              position="right"
              bgColor="primary"
              handleOpenModal={handleOpenUpdateProjectModal}
            >
              <MdEdit className="text-2xl text-light-100" />
            </FloatingActionButton>
            <FloatingActionButton
              title="Borrar proyecto"
              position="left"
              bgColor="red"
              handleOpenModal={handleOpenDeleteProjectModal}
            >
              <MdDelete className="text-2xl text-light-100" />
            </FloatingActionButton>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 p-5 bg-light-100 dark:bg-dark-300 rounded-md text-dark-300 dark:text-light-100 my-5">
        <h2 className="text-dark-300 dark:text-light-100 text-lg font-semibold mb-4">
          Miembros del proyecto:
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Creador:</h3>
            <div className="flex gap-2 flex-wrap max-w-full mt-2 ">
              <div className="text-sm flex gap-1 items-center bg-light-200 dark:bg-dark-200 p-2 rounded-md shadow-sm">
                <UserAvatar
                  size="small"
                  username={project?.project.creator.username!}
                  bgColor="primary"
                />
                <div className="flex flex-col">
                  <span>{project?.project.creator.username}</span>
                  <span>{project?.project.creator.email}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Colaboradores:</h3>
            <div className="flex gap-2 flex-wrap max-w-full mt-2">
              {!project?.project.collaborators.filter(
                (collaborator) => collaborator.role !== "admin"
              ).length && (
                <span className="text-sm text-gray-300">
                  Aún no hay colaboradores en este proyecto
                </span>
              )}
              {project?.project.collaborators.map((user) => {
                if (user.role === "collaborator") {
                  return (
                    <div
                      className="flex flex-col gap-2 bg-light-200 dark:bg-dark-200 p-2 rounded-md shadow-sm"
                      key={user._id}
                    >
                      <div className="text-sm flex gap-1 items-center">
                        <UserAvatar
                          size="small"
                          username={user.user.username}
                          bgColor="red"
                        />
                        <div className="flex flex-col">
                          <span>{user.user.username}</span>
                          <span>{user.user.email}</span>
                        </div>
                      </div>
                      {uid === project?.project.creator._id && (
                        <>
                          <Button
                            size="small"
                            bgColor="red"
                            onClick={() => {
                              setSelectedUser({
                                userId: user.user._id,
                                email: user.user.email,
                              });
                              handleOpenDeleteCollaboratorModal();
                            }}
                          >
                            eliminar
                          </Button>
                        </>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </div>
          {uid === project?.project.creator._id && (
            <Button
              size="medium"
              bgColor="primary"
              onClick={handleOpenAddCollaboratorModal}
            >
              <div className="flex gap-1 items-center">
                añadir colaborador <AiOutlineUserAdd />
              </div>
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col p-5 bg-light-100 dark:bg-dark-300 rounded-md text-dark-300 dark:text-light-100 my-5">
        <h2 className="text-dark-300 dark:text-light-100 text-lg font-semibold mb-2">
          Usuarios invitados:
        </h2>

        <div className="flex gap-4 flex-wrap max-w-full">
          {!project?.project.invitations.length && (
            <span className="text-sm">
              Aún no hay usuarios invitados en este proyecto
            </span>
          )}
          {project?.project.invitations.map((user) => (
            <div
              key={user._id}
              className="flex flex-col gap-2 bg-light-200 dark:bg-dark-200 p-2 rounded-md shadow-sm"
            >
              <div className="text-sm flex gap-1 items-center ">
                <UserAvatar
                  size="small"
                  username={user.username}
                  bgColor="red"
                />
                <div className="flex flex-col">
                  <span>{user.username}</span>
                  <span>{user.email}</span>
                </div>
              </div>
              {uid === project?.project.creator._id && (
                <Button
                  size="small"
                  bgColor="red"
                  onClick={() =>
                    cancelInvitation({ projectId: id, userId: user._id })
                  }
                >
                  <div className="flex gap-1 items-center">
                    cancelar invitación
                    <FiUserX />
                  </div>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      <AddCollaboratorModal
        projectId={id!}
        isOpenModal={isOpenAddCollaboratorModal}
        handleCloseModal={handleCloseAddCollaboratorModal}
      />
      <DeleteCollaboratorModal
        projectId={id!}
        userId={selectedUser.userId}
        email={selectedUser.email}
        isOpenModal={isOpenDeleteCollaboratorModal}
        handleCloseModal={handleCloseDeleteCollaboratorModal}
      />
      <DeleteProjectModal
        projectId={id!}
        projectTitle={project?.project.title!}
        isOpenModal={isOpenDeleteProjectModal}
        handleCloseModal={handleCloseDeleteProjectModal}
      />
      <UpdateProjectModal
        projectId={id!}
        title={project?.project.title!}
        description={project?.project.description!}
        isOpenModal={isOpenUpdateProjectModal}
        handleCloseModal={handleCloseUpdateProjectModal}
      />
    </div>
  );
};
