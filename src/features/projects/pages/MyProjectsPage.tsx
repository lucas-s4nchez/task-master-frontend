import { ProjectCard } from "../components";
import { IProject } from "../../../models/data";
import { Loader } from "../../ui/components";
import { useGetMyProjectsQuery } from "../services/projectsApi";

export const MyProjectsPage: React.FC = () => {
  const { data, isLoading } = useGetMyProjectsQuery(undefined, {
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
          Aún no tienes ningún proyecto, crea uno!
        </div>
      ) : (
        <h1 className="text-xl font-semibold text-dark-300 dark:text-light-100 ">
          Mis proyectos
        </h1>
      )}
      {data?.projects.map((project: IProject) => (
        <ProjectCard key={project._id} {...project} />
      ))}
    </div>
  );
};
