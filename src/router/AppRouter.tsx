import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route } from "react-router";
import { Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { HomePage } from "../HomePage";
import { useRefeshTokenQuery } from "../store/api/apiSlice";
import {
  onCheckingCredentials,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";
import { RootState } from "../store/store";
import { Loader } from "../ui/components/Loader";

export const AppRoutes: React.FC = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.auth);
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
        })
      );
    }
    if (error) {
      localStorage.removeItem("authToken");
      dispatch(onLogout());
    }
  }, [isSuccess, error, isLoading]);

  if (status === "checking") {
    return <Loader />;
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
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </>
      )}
    </Routes>
  );
};
