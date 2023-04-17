import { useEffect } from "react";
import { Navigate, Route } from "react-router";
import { Routes } from "react-router-dom";
import { LoginPage } from "../features/authentication/pages/LoginPage";
import { RegisterPage } from "../features/authentication/pages/RegisterPage";
import { HomePage } from "../features/projects/pages/HomePage";
import { Loader } from "../features/ui/components/Loader";
import { MyProjectsPage } from "../features/projects/pages/MyProjectsPage";
import { CollaborationInProjectsPage } from "../features/projects/pages/CollaborationInProjectsPage";
import { ProjectPage } from "../features/projects/pages/ProjectPage";
import { NotificationPage } from "../features/projects/pages/NotificationPage";
import { useAuthStore, useUiStore } from "../hooks";
import { ProjectsLayout } from "../features/projects/layout/ProjectsLayout";
import { ProjectInfo } from "../features/projects/pages/ProjectInfo";
import { ProjectTasks } from "../features/projects/pages/ProjectTasks";

export const AppRoutes: React.FC = () => {
  const { status } = useAuthStore();
  const { themeMode } = useUiStore();

  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  if (status === "checking") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <Routes>
      {status !== "authenticated" ? (
        <>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/*" element={<Navigate to={"/auth/login"} />} />
        </>
      ) : (
        <Route element={<ProjectsLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/my-projects" element={<MyProjectsPage />} />
          <Route
            path="/other-projects"
            element={<CollaborationInProjectsPage />}
          />
          <Route path="/projects/:id/*" element={<ProjectPage />}>
            <Route path="info" element={<ProjectInfo />} />
            <Route path="tasks" element={<ProjectTasks />} />
          </Route>
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Route>
      )}
    </Routes>
  );
};
