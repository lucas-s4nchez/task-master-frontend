import { motion } from "framer-motion";
import { FaTasks } from "react-icons/fa";
import { ILogoComponentProps } from "../interfaces";

export const Logo: React.FC<ILogoComponentProps> = ({
  size,
}: ILogoComponentProps) => {
  return (
    <div className="flex justify-center items-center gap-2 w-max">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360, 360],
        }}
        transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 70 }}
      >
        <FaTasks
          className={`
          ${size === "small" && "text-xl"}
          ${size === "medium" && "text-3xl"}
          ${size === "large" && "text-4xl"}
          text-dark-300 dark:text-light-100`}
        />
      </motion.div>
      <div
        className={`
        ${size === "small" && "text-xl"}
        ${size === "medium" && "text-3xl"}
        ${size === "large" && "text-4xl"}
          `}
      >
        <span className="text-dark-300 dark:text-light-100">Task</span>
        <span className="text-primary-50">Master</span>
      </div>
    </div>
  );
};
