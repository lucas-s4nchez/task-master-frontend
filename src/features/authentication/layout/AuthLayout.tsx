import { motion } from "framer-motion";
import { Logo } from "../../ui/components";
import { IAuthLayoutProps } from "../../../models/components";

export const AuthLayout: React.FC<IAuthLayoutProps> = ({
  children,
  title,
}: IAuthLayoutProps) => {
  return (
    <div className="min-h-screen grid place-items-center bg-light-50 dark:bg-dark-300">
      <div className="custom-container">
        <motion.div
          className="flex justify-center"
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "tween",
            ease: "easeOut",
          }}
        >
          <Logo size="large" />
        </motion.div>
        <motion.div
          className="sm:w-[32rem] p-5 md:p-8 rounded mx-auto mt-6"
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", ease: "easeOut", delay: 0.2 }}
        >
          <h5 className="text-3xl text-dark-300 dark:text-light-100 mb-2">
            {title}
          </h5>
          {children}
        </motion.div>
      </div>
    </div>
  );
};
