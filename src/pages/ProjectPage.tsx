import { useParams } from "react-router-dom";
import {
  useGetProjectByIdQuery,
  useGetTasksQuery,
} from "../store/api/apiSlice";
import { Button, Loader } from "../ui/components";
import { MdEdit } from "react-icons/md";
import { ICustomFetchBaseQueryError } from "../interfaces/data";
import { TaskContainer } from "../components";

export const ProjectPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetProjectByIdQuery(id!);
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasksQuery(id!);

  if (isLoading || isLoadingTasks) {
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
      <TaskContainer tasks={tasks?.tasks!} projectId={id!} />
    </div>
  );
};
