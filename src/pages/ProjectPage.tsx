import { useParams } from "react-router-dom";
import {
  useCancelProjectInvitationMutation,
  useGetProjectByIdQuery,
  useGetTasksQuery,
} from "../store/api/apiSlice";
import { AnimatePresence } from "framer-motion";
import { Button, Loader, UserAvatar } from "../ui/components";
import { ICustomFetchBaseQueryError } from "../interfaces/data";
import {
  TaskContainer,
  TaskItem,
  UpdateProjectModal,
  DeleteProjectModal,
  AddCollaboratorModal,
} from "../components";
import { useAuthStore, useUiStore } from "../hooks";
import { useModal } from "../ui/hooks/useModal";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdDelete, MdEdit } from "react-icons/md";
import { FiUserX } from "react-icons/fi";

export const ProjectPage: React.FC = () => {
  const { id } = useParams();
  const { isOpenTask } = useUiStore();
  const { uid } = useAuthStore();
  const {
    isOpenModal: isOpenAddCollaboratorModal,
    handleOpenModal: handleOpenAddCollaboratorModal,
    handleCloseModal: handleCloseAddCollaboratorModal,
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
  const { data, isLoading, isError, error } = useGetProjectByIdQuery(id!);
  const [cancelInvitation] = useCancelProjectInvitationMutation();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasksQuery(id!, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  if (isLoading || isLoadingTasks) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (isError) {
    return <h1>{(error as ICustomFetchBaseQueryError).data?.msg}</h1>;
  }

  return (
    <div>
      <div className="flex flex-col gap-2 p-5 bg-light-100 dark:bg-dark-300 rounded-md text-dark-300 dark:text-light-100 mb-5">
        <h1 className="text-3xl font-semibold">{data?.project.title}</h1>
        <h2>{data?.project.description}</h2>
        {uid === data?.project.creator._id && (
          <div className="flex self-end gap-2 mt-2">
            <Button
              bgColor="red"
              size="small"
              disabled={isLoading}
              onClick={handleOpenDeleteProjectModal}
            >
              <div className="flex gap-1 items-center justify-center">
                borrar <MdDelete className="text-sm" />
              </div>
            </Button>
            <Button
              bgColor="primary"
              size="small"
              disabled={isLoading}
              onClick={handleOpenUpdateProjectModal}
            >
              <div className="flex gap-1 items-center justify-center">
                editar <MdEdit className="text-sm" />
              </div>
            </Button>
          </div>
        )}
      </div>
      <TaskContainer
        tasks={tasks?.tasks!}
        projectId={id!}
        projectCreatorId={data?.project.creator._id!}
      />
      <AnimatePresence>{isOpenTask && <TaskItem />}</AnimatePresence>
      <div className="flex flex-col gap-2 p-5 bg-light-100 dark:bg-dark-300 rounded-md text-dark-300 dark:text-light-100 my-5">
        <h2 className="text-dark-300 dark:text-light-100 text-lg font-semibold mb-4">
          Miembros del proyecto:
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Creador:</h3>
            <div className="flex gap-2 flex-wrap max-w-full mt-2">
              <div className="text-sm flex gap-1 items-center">
                <UserAvatar
                  size="small"
                  username={data?.project.creator.username!}
                  bgColor="primary"
                />
                <div className="flex flex-col">
                  <span>{data?.project.creator.username}</span>
                  <span>{data?.project.creator.email}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Colaboradores:</h3>
            <div className="flex gap-2 flex-wrap max-w-full mt-2">
              {!data?.project.collaborators.filter(
                (collaborator) => collaborator.role !== "admin"
              ).length && (
                <span className="text-sm text-gray-300">
                  Aún no hay colaboradores en este proyecto
                </span>
              )}
              {data?.project.collaborators.map((user) => {
                if (user.role === "collaborator") {
                  return (
                    <div
                      key={user._id}
                      className="text-sm flex gap-1 items-center"
                    >
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
                  );
                }
              })}
            </div>
          </div>
          {uid === data?.project.creator._id && (
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
          {!data?.project.invitations.length && (
            <span className="text-sm">Aún no invitaste ningún usuario</span>
          )}
          {data?.project.invitations.map((user) => (
            <div key={user._id}>
              <div className="text-sm flex gap-1 items-center">
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
              {uid === data?.project.creator._id && (
                <div className="mt-2">
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
                </div>
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
      <DeleteProjectModal
        projectId={id!}
        projectTitle={data?.project.title!}
        isOpenModal={isOpenDeleteProjectModal}
        handleCloseModal={handleCloseDeleteProjectModal}
      />
      <UpdateProjectModal
        projectId={id!}
        title={data?.project.title!}
        description={data?.project.description!}
        isOpenModal={isOpenUpdateProjectModal}
        handleCloseModal={handleCloseUpdateProjectModal}
      />
    </div>
  );
};
