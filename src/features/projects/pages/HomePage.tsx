import { IProject } from "../../../models/data";
import { ProjectCard } from "../components";
import { Loader } from "../../ui/components";
import { useAuthStore } from "../../../hooks";
import { useModal } from "../../ui/hooks/useModal";
import { AddProjectModal } from "../components/AddProjectModal";
import {
  useGetMyProjectsQuery,
  useGetProjectsWhereICollaborateQuery,
} from "../services/projectsApi";
import { FloatingActionButton } from "../../ui/components/FloatingActionButton";
import { IoMdAdd } from "react-icons/io";

export const HomePage: React.FC = () => {
  const { uid } = useAuthStore();
  const { isOpenModal, handleOpenModal, handleCloseModal } = useModal();
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
    <div className="flex flex-col gap-4">
      {noProjectExist && !isLoadingProjects ? (
        <div className="p-2 rounded-lg text-lg text-center text-dark-300 dark:text-light-100 ">
          Aún no formas parte de ningún proyecto, crea el tuyo!
        </div>
      ) : (
        <h1 className="text-xl font-semibold text-dark-300 dark:text-light-100 ">
          Todos los proyectos
        </h1>
      )}
      {myProjects?.projects.map((project: IProject) => (
        <ProjectCard key={project._id} {...project} />
      ))}
      {projectsWhereICollaborate?.projects.map((project: IProject) => (
        <ProjectCard key={project._id} {...project} />
      ))}
      <FloatingActionButton
        title="Crear Proyecto"
        position="right"
        bgColor="primary"
        handleOpenModal={handleOpenModal}
      >
        <IoMdAdd className="text-2xl text-light-100" />
      </FloatingActionButton>
      <AddProjectModal
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};
