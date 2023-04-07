import { useState } from "react";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { motion, AnimatePresence } from "framer-motion";
import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import { ITaskColumnProps } from "../interfaces/componentsProps";
import { onSetActiveTask } from "../store/tasks/tasksSlice";
import { Button } from "../ui/components";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { onToggleTask } from "../store/ui/uiSlice";

export const TaskColumn: React.FC<ITaskColumnProps> = ({
  droppableId,
  taskList,
}: ITaskColumnProps) => {
  const dispatch = useDispatch();
  const { activeTask } = useSelector((state) => (state as RootState).tasks);

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
                  onClick={() => dispatch(onSetActiveTask(task))}
                >
                  <span>{task.title}</span>
                  {activeTask?._id === task._id && (
                    <div className="flex justify-end">
                      <Button
                        size="small"
                        bgColor="red"
                        onClick={() => dispatch(onToggleTask())}
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
