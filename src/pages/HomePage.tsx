import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navbar } from "../components/Navbar";
import { AppLayout } from "../layout/AppLayout";

export const HomePage = () => {
  const { username, email, uid } = useSelector(
    (state) => (state as RootState).auth
  );
  return <AppLayout>HomePage</AppLayout>;
};
