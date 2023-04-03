import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AppLayout } from "../layout/AppLayout";
import {
  useGetMyProjectsQuery,
  useGetProjectsWhereICollaborateQuery,
} from "../store/api/apiSlice";
import { Loader } from "../ui/components";
import { ProjectCard } from "../components/ProjectCard";
import { IProject } from "../interfaces";
import { AddProjectButton } from "../components/AddProjectButton";

export const HomePage = () => {
  const { uid } = useSelector((state) => (state as RootState).auth);
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
    <div>Loading...</div>;
  }

  return (
    <AppLayout>
      <div className="">
        {noProjectExist && !isLoadingProjects && (
          <div className="p-2 rounded-lg text-lg text-center text-dark-300 dark:text-light-100 ">
            Aún no formas parte de ningún proyecto, crea el tuyo!
          </div>
        )}
        {myProjects?.projects.map((project: IProject) => (
          <ProjectCard key={project._id} {...project} />
        ))}
        {projectsWhereICollaborate?.projects.map((project: IProject) => (
          <ProjectCard key={project._id} {...project} />
        ))}
      </div>
      <AddProjectButton />
    </AppLayout>
  );
};
