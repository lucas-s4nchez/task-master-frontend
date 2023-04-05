import { Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import { ITaskColumnProps } from "../interfaces/componentsProps";
import { useDispatch } from "react-redux";
import { onSetActiveTask } from "../store/tasks/tasksSlice";

export const TaskColumn: React.FC<ITaskColumnProps> = ({
  droppableId,
  taskList,
}: ITaskColumnProps) => {
  const dispatch = useDispatch();

  return (
    <Droppable droppableId={droppableId}>
      {(droppableProvided) => (
        <div
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
          className="w-60 sm:w-72 xl:w-80 flex flex-col gap-2 mt-4"
        >
          {taskList.map(
            (task, index) =>
              task._id && (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(draggableProvided) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      className={`p-2 rounded-md ${
                        droppableId === "to do" && "bg-yellow-50"
                      } ${droppableId === "in progress" && "bg-blue-50"} ${
                        droppableId === "done" && "bg-green-50"
                      }`}
                      onClick={() => dispatch(onSetActiveTask(task))}
                    >
                      {task.title}
                    </div>
                  )}
                </Draggable>
              )
          )}
          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
