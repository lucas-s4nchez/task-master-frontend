import { Loader } from "../../ui/components";
import { IProject } from "../../../models/data";
import { ProjectCard } from "../components";
import { useAuthStore } from "../../../hooks";
import { useGetProjectsWhereICollaborateQuery } from "../services/projectsApi";

export const CollaborationInProjectsPage: React.FC = () => {
  const { uid } = useAuthStore();
  const { data, isLoading } = useGetProjectsWhereICollaborateQuery(uid ?? "", {
    refetchOnFocus: true,
  });
  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {!data?.projects.length && !isLoading ? (
        <div className="p-2 rounded-lg text-lg text-center text-dark-300 dark:text-light-100 ">
          Aún no colaboras en ningún proyecto.
        </div>
      ) : (
        <h1 className="text-xl font-semibold text-dark-300 dark:text-light-100 ">
          Proyectos donde soy colaborador
        </h1>
      )}
      {data?.projects.map((project: IProject) => (
        <ProjectCard key={project._id} {...project} />
      ))}
    </div>
  );
};
