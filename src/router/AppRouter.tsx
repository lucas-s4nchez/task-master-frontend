import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route } from "react-router";
import { Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { HomePage } from "../pages/HomePage";
import { useRefeshTokenQuery } from "../store/api/apiSlice";
import {
  onCheckingCredentials,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";
import { RootState } from "../store/store";
import { Loader } from "../ui/components/Loader";
import { AppLayout } from "../layout/AppLayout";
import { MyProjectsPage } from "../pages/MyProjectsPage";
import { CollaborationInProjectsPage } from "../pages/CollaborationInProjectsPage";
import { ProjectPage } from "../pages/ProjectPage";
import { NotificationPage } from "../pages/NotificationPage";

export const AppRoutes: React.FC = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => (state as RootState).auth);
  const { data, isLoading, isSuccess, error } = useRefeshTokenQuery();
  const { themeMode } = useSelector((state) => (state as RootState).ui);

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
      dispatch(onCheckingCredentials());
    }
    if (authToken && isSuccess) {
      localStorage.setItem("authToken", data.token); // guarda el nuevo token en localStorage
      dispatch(
        onLogin({
          token: data.token,
          username: data.username,
          email: data.email,
          uid: data.uid,
        })
      );
    }
    if (error) {
      localStorage.removeItem("authToken");
      dispatch(onLogout());
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
              <AppLayout>
                <HomePage />
              </AppLayout>
            }
          />
          <Route
            path="/notifications"
            element={
              <AppLayout>
                <NotificationPage />
              </AppLayout>
            }
          />
          <Route
            path="/my-projects"
            element={
              <AppLayout>
                <MyProjectsPage />
              </AppLayout>
            }
          />
          <Route
            path="/other-projects"
            element={
              <AppLayout>
                <CollaborationInProjectsPage />
              </AppLayout>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <AppLayout>
                <ProjectPage />
              </AppLayout>
            }
          />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </>
      )}
    </Routes>
  );
};
