import {
  onCheckingCredentials,
  onLogin,
  onLogout,
} from "../features/authentication/context/authSlice";
import { ILoginPayload } from "../models/store/authentication";
import { useAppDispatch, useAppSelector } from "./store";

export const useAuthStore = () => {
  const { status, uid, token, username, email } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const handleCheckingCredentials = () => {
    dispatch(onCheckingCredentials());
  };
  const handleLogin = ({ token, username, email, uid }: ILoginPayload) => {
    dispatch(onLogin({ token, username, email, uid }));
  };
  const handleLogout = () => {
    dispatch(onLogout());
  };

  return {
    status,
    uid,
    token,
    username,
    email,
    handleCheckingCredentials,
    handleLogin,
    handleLogout,
  };
};
