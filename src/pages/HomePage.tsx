import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AppLayout } from "../layout/AppLayout";
import { useGetMyProjectsQuery } from "../store/api/apiSlice";
import { Loader } from "../ui/components";
import { ProjectCard } from "../components/ProjectCard";

export const HomePage = () => {
  const { username, email, uid } = useSelector(
    (state) => (state as RootState).auth
  );
  const { data, isLoading } = useGetMyProjectsQuery();

  if (isLoading) {
    <Loader />;
  }
  return (
    <AppLayout>
      <ul>
        {data?.projects.map((project) => (
          <ProjectCard key={project._id} {...project} />
        ))}
      </ul>
    </AppLayout>
  );
};
