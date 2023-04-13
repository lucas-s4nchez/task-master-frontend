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
import { useRefeshTokenQuery } from "../features/authentication/services/authenticationApi";
import { ProjectsLayout } from "../features/projects/layout/ProjectsLayout";
import { ProjectInfo } from "../features/projects/pages/ProjectInfo";
import { ProjectTasks } from "../features/projects/pages/ProjectTasks";

export const AppRoutes: React.FC = () => {
  const { data, isLoading, isSuccess, error } = useRefeshTokenQuery();
  const { status, handleCheckingCredentials, handleLogin, handleLogout } =
    useAuthStore();
  const { themeMode } = useUiStore();

  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken"); // obtener el token guardado en localStorage
    if (isLoading) {
      handleCheckingCredentials();
    }
    if (authToken && isSuccess) {
      handleLogin({
        token: data.token,
        username: data.username,
        email: data.email,
        uid: data.uid,
      });
    }
    if (error) {
      handleLogout();
    }
  }, [isSuccess, error, isLoading]);

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
        <>
          <Route
            path="/"
            element={
              <ProjectsLayout>
                <HomePage />
              </ProjectsLayout>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProjectsLayout>
                <NotificationPage />
              </ProjectsLayout>
            }
          />
          <Route
            path="/my-projects"
            element={
              <ProjectsLayout>
                <MyProjectsPage />
              </ProjectsLayout>
            }
          />
          <Route
            path="/other-projects"
            element={
              <ProjectsLayout>
                <CollaborationInProjectsPage />
              </ProjectsLayout>
            }
          />
          <Route
            path="/projects/:id/*"
            element={
              <ProjectsLayout>
                <ProjectPage />
              </ProjectsLayout>
            }
          >
            <Route path="" element={<ProjectInfo />} />
            <Route path="tasks" element={<ProjectTasks />} />
          </Route>
          <Route path="/*" element={<Navigate to={"/"} />} />
        </>
      )}
    </Routes>
  );
};
