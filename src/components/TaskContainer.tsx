import { DragDropContext } from "react-beautiful-dnd";
import { TaskColumn } from "./TaskColumn";
import { ITaskContainerProps } from "../interfaces";

export const TaskContainer = ({
  toDoTasks,
  inProgressTasks,
  completedTasks,
}: ITaskContainerProps) => {
  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId) {
          console.log("Misma columna");
        }
        if (source.droppableId !== destination.droppableId) {
          console.log("Otra columna");
        }
      }}
    >
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
