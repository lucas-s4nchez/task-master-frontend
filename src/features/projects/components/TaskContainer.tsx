import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { toast } from "sonner";
import { TaskColumn } from "./TaskColumn";
import { useEffect } from "react";
import { useAuthStore, useProjectsStore } from "../../../hooks";
import { useUpdateTasksMutation } from "../services/tasksApi";
import { handleTaskListUpdate } from "../utils/handleTaskListUpdate";
import { checkUserAuthorizationToUpdateTask } from "../utils/checkUserAuthorization";
import { useTasks } from "../hooks/useTasks";
import { ITaskContainerProps } from "../../../models/components";

export const TaskContainer: React.FC<ITaskContainerProps> = ({
  tasks,
  projectCreatorId,
}: ITaskContainerProps) => {
  const { uid } = useAuthStore();
  const { activeProject } = useProjectsStore();
  const [updateTask, { data, isLoading, isSuccess }] = useUpdateTasksMutation();
  const {
    toDoTasks,
    inProgressTasks,
    completedTasks,
    setToDoTasks,
    setInProgressTasks,
    setCompletedTasks,
  } = useTasks(tasks);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.msg);
    }
  }, [data, isSuccess]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    const currentTask = tasks.find((task) => task._id === draggableId);

    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;
    if (!currentTask) return;
    if (
      !checkUserAuthorizationToUpdateTask({
        currentTask,
        uid: uid!,
        projectCreatorId: projectCreatorId,
      })
    )
      return;

    if (source.droppableId !== destination.droppableId) {
      handleTaskListUpdate({
        currentTask,
        setToDoTasks,
        setInProgressTasks,
        setCompletedTasks,
        sourceDroppableId: source.droppableId,
        destinationDroppableId: destination.droppableId,
        destinationIndex: destination.index,
      });

      await updateTask({
        projectId: activeProject?._id,
        id: draggableId,
        title: currentTask?.title,
        description: currentTask?.description,
        assignedTo: currentTask?.assignedTo.map((user) => user._id),
        status: destination.droppableId,
      });
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-light-100 dark:bg-dark-300 p-4 rounded-b-md rounded-r-md mb-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-dark-300 dark:text-light-100 text-lg font-semibold ">
            Tareas:
          </h2>
        </div>
        <div className="h-[30rem] flex py-3 gap-4 justify-between overflow-auto  scrollbar-thin scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-thumb-primary-50 scrollbar-track-light-400">
          <div className="min-w-min bg-light-300 dark:bg-dark-400 rounded-md px-2 py-4 ">
            <h2 className="text-dark-100 dark:text-light-100 ">Pendientes:</h2>
            <TaskColumn droppableId="to do" taskList={toDoTasks} />
          </div>
          <div className="min-w-min bg-light-300 dark:bg-dark-400 rounded-md px-2 py-4">
            <h2 className="text-dark-100 dark:text-light-100 ">En progreso:</h2>
            <TaskColumn droppableId="in progress" taskList={inProgressTasks} />
          </div>
          <div className="min-w-min bg-light-300 dark:bg-dark-400 rounded-md px-2 py-4">
            <h2 className="text-dark-100 dark:text-light-100 ">Completadas:</h2>
            <TaskColumn droppableId="done" taskList={completedTasks} />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};
