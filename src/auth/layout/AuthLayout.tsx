import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RootState } from "../../store/store";
import { IAuthLayoutProps } from "../interfaces";
import { Logo } from "../../ui/components";
import { onDarkMode, onLightMode } from "../../store/ui/uiSlice";

export const AuthLayout: React.FC<IAuthLayoutProps> = ({
  children,
  title,
}: IAuthLayoutProps) => {
  const { themeMode } = useSelector((state) => (state as RootState).ui);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen grid place-items-center bg-light-50 dark:bg-dark-300">
      <div className="custom-container">
        <button
          className="bg-red-50 p-2"
          onClick={() => {
            if (themeMode === "light") {
              dispatch(onDarkMode());
            } else {
              dispatch(onLightMode());
            }
          }}
        >
          {themeMode}
        </button>
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
