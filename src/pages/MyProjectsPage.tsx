import { useGetMyProjectsQuery } from "../store/api/apiSlice";
import { AddProjectButton, ProjectCard } from "../components";
import { IProject } from "../interfaces/data";
import { Loader } from "../ui/components";

export const MyProjectsPage: React.FC = () => {
  const { data, isLoading } = useGetMyProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>;
  }
  return (
    <div className="">
      {!data?.projects.length && !isLoading ? (
        <div className="p-2 rounded-lg text-lg text-center text-dark-300 dark:text-light-100 ">
          Aún no tienes ningún proyecto, crea uno!
        </div>
      ) : (
        <h1 className="text-lg font-semibold mb-4 text-dark-300 dark:text-light-100 ">
          Mis proyectos
        </h1>
      )}
      {data?.projects.map((project: IProject) => (
        <ProjectCard key={project._id} {...project} />
      ))}
      <AddProjectButton />
    </div>
  );
};
