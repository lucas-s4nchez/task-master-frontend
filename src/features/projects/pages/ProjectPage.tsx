import { useEffect } from "react";
import { Outlet, NavLink, useLocation, useParams } from "react-router-dom";
import { useProjectsStore } from "../../../hooks";
import { useGetProjectByIdQuery } from "../services/projectsApi";
import { Loader } from "../../ui/components";

export const ProjectPage: React.FC = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { handleSetActiveProject, handleClearActiveProject } =
    useProjectsStore();
  const { data: project, isLoading } = useGetProjectByIdQuery(id!, {
    refetchOnFocus: true,
  });

  useEffect(() => {
    if (project?.project) {
      handleSetActiveProject(project?.project!);
    }
    return () => {
      handleClearActiveProject();
    };
  }, [project, pathname]);

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="px-2 py-3 rounded-t-md flex gap-4 bg-light-100 dark:bg-dark-300 w-fit uppercase text-sm">
        <NavLink
          to={"info"}
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-primary-50 text-dark-300 dark:text-light-100 transition-all duration-150"
              : "border-none text-dark-300 dark:text-light-100 transition-all duration-150"
          }
        >
          Información
        </NavLink>
        <NavLink
          to={`tasks`}
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-primary-50 text-dark-300 dark:text-light-100 transition-all duration-150"
              : "border-none text-dark-300 dark:text-light-100 transition-all duration-150"
          }
        >
          tareas
        </NavLink>
      </div>
      <div className="w-full h-full p-5 bg-light-100 dark:bg-dark-300 rounded-b-md rounded-r-md">
        <Outlet />
      </div>
    </div>
  );
};
