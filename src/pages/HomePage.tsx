import {
  useGetMyProjectsQuery,
  useGetProjectsWhereICollaborateQuery,
} from "../store/api/apiSlice";
import { IProject } from "../interfaces/data";
import { AddProjectButton, ProjectCard } from "../components";
import { Loader } from "../ui/components";
import { useAuthStore } from "../hooks";

export const HomePage: React.FC = () => {
  const { uid } = useAuthStore();
  const { data: myProjects, isLoading: isLoadingMyProjects } =
    useGetMyProjectsQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const {
    data: projectsWhereICollaborate,
    isLoading: isLoadingProjectsWhereICollaborate,
  } = useGetProjectsWhereICollaborateQuery(uid ?? "", {
    refetchOnMountOrArgChange: true,
  });

  const isLoadingProjects: boolean =
    isLoadingMyProjects || isLoadingProjectsWhereICollaborate;

  const noProjectExist: boolean =
    !myProjects?.projects.length && !projectsWhereICollaborate?.projects.length;

  if (isLoadingProjects) {
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>;
  }

  return (
    <div className="">
      {noProjectExist && !isLoadingProjects ? (
        <div className="p-2 rounded-lg text-lg text-center text-dark-300 dark:text-light-100 ">
          Aún no formas parte de ningún proyecto, crea el tuyo!
        </div>
      ) : (
        <h1 className="text-lg font-semibold text-dark-300 dark:text-light-100 ">
          Todos los proyectos
        </h1>
      )}
      {myProjects?.projects.map((project: IProject) => (
        <ProjectCard key={project._id} {...project} />
      ))}
      {projectsWhereICollaborate?.projects.map((project: IProject) => (
        <ProjectCard key={project._id} {...project} />
      ))}
      <AddProjectButton />
    </div>
  );
};
