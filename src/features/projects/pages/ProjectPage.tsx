import { useEffect } from "react";
import { Outlet, NavLink, useLocation, useParams } from "react-router-dom";
import { useProjectsStore } from "../../../hooks";
import { useGetProjectByIdQuery } from "../services/projectsApi";

export const ProjectPage: React.FC = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { handleSetActiveProject, handleClearActiveProject } =
    useProjectsStore();
  const { data: project } = useGetProjectByIdQuery(id!, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (project?.project) {
      handleSetActiveProject(project?.project!);
    }
    return () => {
      handleClearActiveProject();
    };
  }, [project, pathname]);
  return (
    <div>
      <div className="p-2 flex gap-2 bg-light-100 dark:bg-dark-300 w-fit">
        <NavLink to={""}>Información</NavLink>
        <NavLink
          to={`${pathname.includes("/tasks") ? pathname : `${pathname}/tasks`}`}
        >
          tareas
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
