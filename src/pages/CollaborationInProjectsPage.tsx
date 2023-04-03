import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetProjectsWhereICollaborateQuery } from "../store/api/apiSlice";
import { Loader } from "../ui/components";
import { IProject } from "../interfaces";
import { ProjectCard } from "../components/ProjectCard";

export const CollaborationInProjectsPage = () => {
  const { uid } = useSelector((state) => (state as RootState).auth);
  const { data, isLoading } = useGetProjectsWhereICollaborateQuery(uid ?? "", {
    refetchOnMountOrArgChange: true,
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {!data?.projects.length && !isLoading ? (
        <div className="p-2 rounded-lg text-lg text-center text-dark-300 dark:text-light-100 ">
          Aún no colaboras en ningún proyecto.
        </div>
      ) : (
        <h1 className="text-lg font-semibold mb-4 text-dark-300 dark:text-light-100 ">
          Proyectos donde soy colaborador
        </h1>
      )}
      {data?.projects.map((project: IProject) => (
        <ProjectCard key={project._id} {...project} />
      ))}
    </>
  );
};
