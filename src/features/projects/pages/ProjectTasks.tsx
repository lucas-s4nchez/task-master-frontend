import { AnimatePresence } from "framer-motion";
import { TaskContainer, TaskItem } from "../components";
import { useProjectsStore, useUiStore } from "../../../hooks";
import { useGetTasksQuery } from "../services/tasksApi";
import { useParams } from "react-router-dom";
import { Loader } from "../../ui/components";

export const ProjectTasks = () => {
  const { isOpenTask } = useUiStore();
  const { activeProject } = useProjectsStore();
  const { id } = useParams();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasksQuery(id!, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  if (isLoadingTasks) {
    return null;
  }
  return (
    <div>
      <TaskContainer
        tasks={tasks?.tasks!}
        projectId={id!}
        projectCreatorId={activeProject?.creator._id!}
      />
      <AnimatePresence>{isOpenTask && <TaskItem />}</AnimatePresence>
    </div>
  );
};
