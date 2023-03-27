import { FaTasks } from "react-icons/fa";

export const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-light-50 dark:bg-dark-300 p-8">
      <div className="flex justify-center">
        <FaTasks className="text-5xl text-dark-300 dark:text-light-50 animate-pulse" />
      </div>
    </div>
  );
};
