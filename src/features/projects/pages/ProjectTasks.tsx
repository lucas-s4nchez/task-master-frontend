import { AnimatePresence } from "framer-motion";
import { TaskContainer, TaskItem } from "../components";
import { useProjectsStore, useUiStore } from "../../../hooks";
import { useGetTasksQuery } from "../services/tasksApi";
import { useParams } from "react-router-dom";
import { FloatingActionButton } from "../../ui/components/FloatingActionButton";
import { useModal } from "../../ui/hooks/useModal";
import { AddTaskModal } from "../components/AddTaskModal";
import { IoMdAdd } from "react-icons/io";
import { Loader } from "../../ui/components";

export const ProjectTasks = () => {
  const { id } = useParams();
  const { isOpenTask } = useUiStore();
  const { activeProject } = useProjectsStore();
  const { isOpenModal, handleOpenModal, handleCloseModal } = useModal();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasksQuery(id!, {
    refetchOnFocus: true,
  });

  if (isLoadingTasks) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <TaskContainer
        tasks={tasks?.tasks!}
        projectCreatorId={activeProject?.creator._id!}
      />
      <FloatingActionButton
        title="Crear Tarea"
        position="right"
        bgColor="primary"
        handleOpenModal={handleOpenModal}
      >
        <IoMdAdd className="text-2xl text-light-100" />
      </FloatingActionButton>
      <AddTaskModal
        projectId={id!}
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
      />
      <AnimatePresence>{isOpenTask && <TaskItem />}</AnimatePresence>
    </div>
  );
};
