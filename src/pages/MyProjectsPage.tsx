import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetMyProjectsQuery } from "../store/api/apiSlice";
import { ProjectCard } from "../components/ProjectCard";
import { AddProjectButton } from "../components/AddProjectButton";
import { IProject } from "../interfaces";
import { Loader } from "../ui/components";

export const MyProjectsPage = () => {
  const { uid } = useSelector((state) => (state as RootState).auth);
  const { data, isLoading } = useGetMyProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <Loader />;
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
