import { useEffect } from "react";
import { useAuthStore } from "../../../hooks";
import { useRefeshTokenQuery } from "../services/authenticationApi";
import { IChildrenProps } from "../../../models/components";

export const AuthProvider: React.FC<IChildrenProps> = ({
  children,
}: IChildrenProps) => {
  const { data, isLoading, isSuccess, error } = useRefeshTokenQuery();
  const { handleCheckingCredentials, handleLogin, handleLogout } =
    useAuthStore();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
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

  return <>{children}</>;
};
