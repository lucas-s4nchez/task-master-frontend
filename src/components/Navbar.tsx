import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { onToggleMenu } from "../store/ui/uiSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Menu } from "./Menu";
import { Logo, ThemeSwitcher } from "../ui/components";
import { RootState } from "../store/store";

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpenMenu } = useSelector((state) => (state as RootState).ui);
  const notifications = 1;
  return (
    <>
      {isOpenMenu && (
        <div
          className="absolute top-0 z-20 left-0 w-screen h-screen bg-dark-400 bg-opacity-30 backdrop-blur-sm"
          onClick={() => dispatch(onToggleMenu())}
        ></div>
      )}
      <motion.div
        className="fixed top-0 left-0 w-full shadow-md z-30 bg-light-100 dark:bg-dark-300"
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "tween" }}
      >
        <nav className="py-4 custom-container flex justify-between items-center relative ">
          <Logo size="small" />
          <div className="flex gap-2">
            <ThemeSwitcher />
            <Link
              to="/"
              className="relative p-2 rounded-full hover:bg-light-200 dark:hover:bg-dark-200"
              title="Notificaciones"
            >
              {!!notifications && (
                <div className="w-5 h-5 flex justify-center items-center  absolute top-0 right-0 bg-red-50 text-light-100 leading-none rounded-full ">
                  {notifications}
                </div>
              )}
              <IoMdNotificationsOutline className="text-2xl text-dark-300 dark:text-light-100" />
            </Link>
            <button
              className="relative p-2 rounded-full hover:bg-light-200 dark:hover:bg-dark-200 z-30"
              onClick={() => dispatch(onToggleMenu())}
            >
              {isOpenMenu ? (
                <motion.div
                  animate={{ rotate: 90 }}
                  transition={{
                    type: "tween",
                    ease: "easeInOut",
                  }}
                >
                  <VscChromeClose className="text-2xl text-dark-300 dark:text-light-100" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ rotate: 0 }}
                  transition={{
                    type: "tween",
                    ease: "easeInOut",
                  }}
                >
                  <GiHamburgerMenu className="text-2xl text-dark-300 dark:text-light-100" />
                </motion.div>
              )}
            </button>
          </div>
          <Menu />
        </nav>
      </motion.div>
    </>
  );
};
