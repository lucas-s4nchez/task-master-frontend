import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillHome } from "react-icons/ai";
import { HiUserGroup, HiUser } from "react-icons/hi";
import { RootState } from "../store/store";
import { NavLink } from "react-router-dom";
const containerVariant = {
  hidden: { x: 300, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
      type: "tween",
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
const menuItems = [
  {
    name: "Inicio",
    icon: <AiFillHome />,
    path: "/",
  },
  {
    name: "Mis Proyectos",
    icon: <HiUser />,
    path: "/projects",
  },
  {
    name: "Otros Proyectos",
    icon: <HiUserGroup />,
    path: "/other-projects",
  },
];
export const Menu = () => {
  const { isOpenMenu } = useSelector((state) => (state as RootState).ui);
  return (
    <>
      <AnimatePresence>
        {isOpenMenu && (
          <motion.ul
            className={`${
              isOpenMenu ? "flex" : "hidden"
            } flex-col gap-3 py-6 px-2 w-60 h-96 absolute top-20 right-0 bg-light-100 dark:bg-dark-200 rounded-lg shadow-lg`}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={containerVariant}
          >
            {menuItems.map((item) => (
              <motion.li key={item.name} variants={itemVariant}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 p-2 border rounded-lg text-dark-300 dark:text-light-100 bg-light-300 dark:bg-dark-300  transition-all duration-150 scale-105"
                      : "flex items-center gap-2 p-2 border rounded-lg text-dark-300 dark:text-light-100 hover:bg-light-300 dark:hover:bg-dark-300  transition-all duration-150"
                  }
                >
                  <div className="text-xl">{item.icon}</div>
                  <span>{item.name}</span>
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};
