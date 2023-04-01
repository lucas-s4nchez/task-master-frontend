import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Logo } from "../ui/components";

export const Navbar = () => {
  const notifications = 1;
  return (
    <motion.div
      className="fixed top-0 left-0 w-full shadow-md"
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "tween" }}
    >
      <nav className="py-4 custom-container flex justify-between items-center">
        <Logo size="small" />
        <div className="flex gap-2">
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
          <button className="p-2 rounded-full hover:bg-light-200 dark:hover:bg-dark-200">
            <GiHamburgerMenu className="text-2xl text-dark-300 dark:text-light-100" />
          </button>
        </div>
      </nav>
    </motion.div>
  );
};
