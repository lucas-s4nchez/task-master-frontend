import React, { useEffect, useState } from "react";
import { ITask } from "../../../models/data";

export const useTasks = (tasks: ITask[]) => {
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

  return {
    toDoTasks,
    inProgressTasks,
    completedTasks,
    setToDoTasks,
    setInProgressTasks,
    setCompletedTasks,
  };
};
