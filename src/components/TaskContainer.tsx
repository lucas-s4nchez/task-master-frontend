import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TaskColumn } from "./TaskColumn";
import { ITaskContainerProps } from "../interfaces";
import { useMemo } from "react";
import { useUpdateTasksMutation } from "../store/api/apiSlice";
import { Loader } from "../ui/components";

export const TaskContainer = ({ tasks, projectId }: ITaskContainerProps) => {
  const [updateTask, { isLoading }] = useUpdateTasksMutation();

  const toDoTasks = useMemo(
    () => tasks.filter((task) => task.status === "to do"),
    [tasks]
  );
  const inProgressTasks = useMemo(
    () => tasks.filter((task) => task.status === "in progress"),
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === "done"),
    [tasks]
  );

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;
    if (source.droppableId !== destination.droppableId) {
      const currentTask = tasks.find((task) => task._id === draggableId);

      const updateTaskBody = {
        projectId,
        id: draggableId,
        title: currentTask?.title,
        description: currentTask?.description,
        assignedTo: currentTask?.assignedTo.map((user) => user._id),
        status: destination.droppableId,
      };

      await updateTask({ ...updateTaskBody });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-light-100 dark:bg-dark-200 p-4 rounded-md">
        <h2>Tareas:</h2>
        <div className="h-[30rem] flex py-3 gap-4 justify-between overflow-auto  scrollbar-thin scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-thumb-primary-50 scrollbar-track-light-400">
          <div className="min-w-min bg-light-300 dark:bg-dark-300 rounded-md px-2 py-4 ">
            <h2 className="text-dark-100 dark:text-light-100 ">Pendientes:</h2>
            <TaskColumn droppableId="to do" taskList={toDoTasks!} />
          </div>
          <div className="min-w-min bg-light-300 dark:bg-dark-300 rounded-md px-2 py-4">
            <h2 className="text-dark-100 dark:text-light-100 ">En progreso:</h2>
            <TaskColumn droppableId="in progress" taskList={inProgressTasks!} />
          </div>
          <div className="min-w-min bg-light-300 dark:bg-dark-300 rounded-md px-2 py-4">
            <h2 className="text-dark-100 dark:text-light-100 ">Completadas:</h2>
            <TaskColumn droppableId="done" taskList={completedTasks!} />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};
