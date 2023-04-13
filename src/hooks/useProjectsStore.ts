import { IProject } from "../models/data";
import {
  onClearActiveProject,
  onSetActiveProject,
} from "../features/projects/context/projectsSlice";
import { useAppDispatch, useAppSelector } from "./store";

export const useProjectsStore = () => {
  const { activeProject } = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();

  const handleSetActiveProject = (project: IProject) => {
    dispatch(onSetActiveProject(project));
  };
  const handleClearActiveProject = () => {
    dispatch(onClearActiveProject());
  };

  return { activeProject, handleSetActiveProject, handleClearActiveProject };
};
