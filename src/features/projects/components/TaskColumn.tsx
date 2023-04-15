import { Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import { Button } from "../../ui/components";
import { useTasksStore, useUiStore } from "../../../hooks";
import { ITaskColumnProps } from "../../../models/components";

export const TaskColumn: React.FC<ITaskColumnProps> = ({
  droppableId,
  taskList,
}: ITaskColumnProps) => {
  const { activeTask, handleSetActiveTask } = useTasksStore();
  const { handleToggleTask } = useUiStore();

  return (
    <Droppable droppableId={droppableId}>
      {(droppableProvided) => (
        <div
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
          className="w-60 sm:w-72 xl:w-80 flex flex-col gap-2 mt-4"
        >
          {taskList.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id} index={index}>
              {(draggableProvided) => (
                <div
                  ref={draggableProvided.innerRef}
                  {...draggableProvided.draggableProps}
                  {...draggableProvided.dragHandleProps}
                  className={` p-2 rounded-md flex flex-col gap-2 ${
                    droppableId === "to do" && "bg-yellow-50"
                  } ${droppableId === "in progress" && "bg-blue-50"} ${
                    droppableId === "done" && "bg-green-50"
                  }`}
                  onClick={() => handleSetActiveTask(task)}
                >
                  <span>{task.title}</span>
                  {activeTask?._id === task._id && (
                    <div className="flex justify-end">
                      <Button
                        size="small"
                        bgColor="red"
                        onClick={handleToggleTask}
                      >
                        ver más
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Draggable>
          ))}
          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
