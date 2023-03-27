import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route } from "react-router";
import { Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { HomePage } from "../HomePage";
import { useRefeshTokenQuery } from "../store/apiSlice";
import { onCheckingCredentials, onLogin, onLogout } from "../store/authSlice";
import { RootState } from "../store/store";
import { ImSpinner9 } from "react-icons/im";

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
      dispatch(onLogin({ username: data.username, token: data.token }));
      localStorage.setItem("authToken", data.token); // guarda el nuevo token en localStorage
    }
    if (error) {
      dispatch(onLogout());
      localStorage.removeItem("authToken");
    }
  }, [isSuccess, error, isLoading]);

  if (status === "checking") {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-black p-8">
        <div className="flex justify-center">
          <ImSpinner9 className="text-4xl text-black dark:text-white animate-spin" />
        </div>
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
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </>
      )}
    </Routes>
  );
};
