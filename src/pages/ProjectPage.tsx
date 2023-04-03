import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useGetProjectByIdQuery } from "../store/api/apiSlice";
import { Button, Loader } from "../ui/components";
import { MdEdit } from "react-icons/md";
import { ICustomFetchBaseQueryError } from "../interfaces";
import { TaskContainer } from "../components/TaskContainer";

export const ProjectPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetProjectByIdQuery(id!);
  const toDoTasks = useMemo(
    () => data?.project.tasks.filter((task) => task.status === "to do"),
    [data]
  );
  const inProgressTasks = useMemo(
    () => data?.project.tasks.filter((task) => task.status === "in progress"),
    [data]
  );
  const completedTasks = useMemo(
    () => data?.project.tasks.filter((task) => task.status === "done"),
    [data]
  );

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h1>{(error as ICustomFetchBaseQueryError).data?.msg}</h1>;
  }
  return (
    <div>
      <div className="flex flex-col gap-2 py-3 px-5 bg-light-100 dark:bg-dark-200 rounded-md text-dark-300 dark:text-light-100 mb-5">
        <h1 className="text-2xl font-semibold">{data?.project.title}</h1>
        <h2>{data?.project.description}</h2>
        <div className="self-end">
          <Button bgColor="primary" size="small" disabled={isLoading}>
            <div className="flex gap-1 items-center justify-center">
              editar <MdEdit className="text-sm" />
            </div>
          </Button>
        </div>
      </div>
      <TaskContainer
        toDoTasks={toDoTasks!}
        inProgressTasks={inProgressTasks!}
        completedTasks={completedTasks!}
      />
    </div>
  );
};
