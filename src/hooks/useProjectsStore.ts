import { IProject } from "../interfaces/data";
import {
  onClearActiveProject,
  onSetActiveProject,
} from "../store/projects/projectsSlice";
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
