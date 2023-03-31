import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const HomePage = () => {
  const { username, email } = useSelector((state) => (state as RootState).auth);
  return (
    <>
      <p className="text-center text-2xl">
        {username}
        {email}
      </p>
    </>
  );
};
