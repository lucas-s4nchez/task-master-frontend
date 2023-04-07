import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TaskColumn } from "./TaskColumn";
import { ITaskContainerProps } from "../interfaces/componentsProps";
import { useEffect, useState } from "react";
import { useUpdateTasksMutation } from "../store/api/apiSlice";
import { Loader } from "../ui/components";
import { ITask } from "../interfaces/data";

export const TaskContainer: React.FC<ITaskContainerProps> = ({
  tasks,
  projectId,
}: ITaskContainerProps) => {
  const [updateTask, { isLoading }] = useUpdateTasksMutation();
  const [toDoTasks, setToDoTasks] = useState<ITask[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const toDoTasks = tasks.filter((task) => task.status === "to do");
    const inProgressTasks = tasks.filter(
      (task) => task.status === "in progress"
    );
    const completedTasks = tasks.filter((task) => task.status === "done");
    setToDoTasks(toDoTasks);
    setInProgressTasks(inProgressTasks);
    setCompletedTasks(completedTasks);
  }, [tasks]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;
    const currentTask = tasks.find((task) => task._id === draggableId);
    if (!currentTask) return;
    if (source.droppableId !== destination.droppableId) {
      if (destination.droppableId === "to do") {
        setToDoTasks((prev) => {
          prev.splice(destination.index, 0, currentTask);
          return prev;
        });
        source.droppableId === "in progress"
          ? setInProgressTasks((prev) => {
              return prev.filter((task) => task._id !== currentTask._id);
            })
          : setCompletedTasks((prev) => {
              return prev.filter((task) => task._id !== currentTask._id);
            });
      }
      if (destination.droppableId === "in progress") {
        setInProgressTasks((prev) => {
          prev.splice(destination.index, 0, currentTask);
          return prev;
        });
        source.droppableId === "to do"
          ? setToDoTasks((prev) => {
              return prev.filter((task) => task._id !== currentTask._id);
            })
          : setCompletedTasks((prev) => {
              return prev.filter((task) => task._id !== currentTask._id);
            });
      }
      if (destination.droppableId === "done") {
        setCompletedTasks((prev) => {
          prev.splice(destination.index, 0, currentTask);
          return prev;
        });
        source.droppableId === "to do"
          ? setToDoTasks((prev) => {
              return prev.filter((task) => task._id !== currentTask._id);
            })
          : setInProgressTasks((prev) => {
              return prev.filter((task) => task._id !== currentTask._id);
            });
      }
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
    return (
      <div className="bg-light-100 dark:bg-dark-300 p-4 rounded-md h-[30rem] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-light-100 dark:bg-dark-300 p-4 rounded-md my-5">
        <h2 className="text-dark-300 dark:text-light-100 text-lg font-semibold mb-4">
          Tareas:
        </h2>
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
