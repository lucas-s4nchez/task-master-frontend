import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { toast } from "sonner";
import { TaskColumn } from "./TaskColumn";
import { ITaskContainerProps } from "../../../models/componentsProps";
import { useEffect, useState } from "react";
import { Button, Loader } from "../../ui/components";
import { ITask } from "../../../models/data";
import { useAuthStore } from "../../../hooks";
import { useModal } from "../../ui/hooks/useModal";
import { AddTaskModal } from "./AddTaskModal";
import { IoMdAdd } from "react-icons/io";
import { useUpdateTasksMutation } from "../services/tasksApi";

export const TaskContainer: React.FC<ITaskContainerProps> = ({
  tasks,
  projectId,
  projectCreatorId,
}: ITaskContainerProps) => {
  const { uid } = useAuthStore();
  const { isOpenModal, handleOpenModal, handleCloseModal } = useModal();
  const [updateTask, { data, isLoading, isSuccess }] = useUpdateTasksMutation();
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
    const isTaskAuthor: boolean = currentTask.author._id === uid;
    const isTaskAssignedUser: boolean = currentTask.assignedTo.some(
      (user) => user._id === uid
    );
    const isProjectCreator: boolean = projectCreatorId === uid;

    const userAuthorizedToUpdateTask: boolean =
      isProjectCreator || isTaskAuthor || isTaskAssignedUser;
    if (!userAuthorizedToUpdateTask) {
      toast.error(
        "No puedes realizar esta acción, no eres el autor o un usuario asignado de la tarea"
      );
      return;
    }

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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-dark-300 dark:text-light-100 text-lg font-semibold ">
            Tareas:
          </h2>
          <Button size="small" bgColor="primary" onClick={handleOpenModal}>
            <div className="flex gap-1 items-center">
              Nueva tarea <IoMdAdd className="text-lg" />
            </div>
          </Button>
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
      <AddTaskModal
        projectId={projectId}
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
      />
    </DragDropContext>
  );
};
