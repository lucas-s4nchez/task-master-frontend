import { useParams } from "react-router-dom";
import {
  useGetProjectByIdQuery,
  useGetTasksQuery,
} from "../store/api/apiSlice";
import { AnimatePresence } from "framer-motion";
import { Button, Loader, UserAvatar } from "../ui/components";
import { MdEdit } from "react-icons/md";
import { ICustomFetchBaseQueryError } from "../interfaces/data";
import { TaskContainer, TaskItem } from "../components";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const ProjectPage: React.FC = () => {
  const { id } = useParams();
  const { isOpenTask } = useSelector((state) => (state as RootState).ui);
  const { data, isLoading, isError, error } = useGetProjectByIdQuery(id!);
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasksQuery(id!);

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
      <div className="flex flex-col gap-2 py-3 px-5 bg-light-100 dark:bg-dark-300 rounded-md text-dark-300 dark:text-light-100 mb-5">
        <h1 className="text-3xl font-semibold">{data?.project.title}</h1>
        <h2>{data?.project.description}</h2>
        <div className="self-end">
          <Button
            bgColor="primary"
            size="small"
            disabled={isLoading}
            onClick={() => {
              console.log("editar");
            }}
          >
            <div className="flex gap-1 items-center justify-center">
              editar <MdEdit className="text-sm" />
            </div>
          </Button>
        </div>
      </div>
      <TaskContainer tasks={tasks?.tasks!} projectId={id!} />
      <AnimatePresence>{isOpenTask && <TaskItem />}</AnimatePresence>
      <div className="flex flex-col gap-2 py-3 px-5 bg-light-100 dark:bg-dark-300 rounded-md text-dark-300 dark:text-light-100 my-5">
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
                  bgColor="red"
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
        </div>
      </div>
      <div className="flex flex-col gap-2 py-3 px-5 bg-light-100 dark:bg-dark-300 rounded-md text-dark-300 dark:text-light-100 my-5">
        <h2 className="text-dark-300 dark:text-light-100 text-lg font-semibold mb-4">
          Usuarios invitados:
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex gap-2 flex-wrap max-w-full">
              {data?.project.invitations.map((user) => (
                <div key={user._id} className="text-sm flex gap-1 items-center">
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
