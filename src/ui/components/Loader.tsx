import { FaTasks } from "react-icons/fa";

export const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <FaTasks className="text-5xl text-dark-300 dark:text-light-50 animate-pulse" />
    </div>
  );
};
