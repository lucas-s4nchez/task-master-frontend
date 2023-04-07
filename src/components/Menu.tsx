import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillHome } from "react-icons/ai";
import { HiUserGroup, HiUser } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { RootState } from "../store/store";
import { NavLink } from "react-router-dom";
import { UserAvatar } from "../ui/components";
import { onLogout } from "../store/auth/authSlice";
import { onToggleMenu } from "../store/ui/uiSlice";
const containerVariant = {
  hidden: { x: 300, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
      type: "tween",
    },
  },
};

const itemVariant = {
  hidden: { x: 100, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { type: "tween" } },
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
    path: "/my-projects",
  },
  {
    name: "Otros Proyectos",
    icon: <HiUserGroup />,
    path: "/other-projects",
  },
];
export const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const { email, username } = useSelector((state) => (state as RootState).auth);
  const { isOpenMenu } = useSelector((state) => (state as RootState).ui);

  return (
    <>
      <AnimatePresence>
        {isOpenMenu && (
          <motion.ul
            className={`${
              isOpenMenu ? "flex" : "hidden"
            } flex-col gap-3 py-6 px-2 w-60 h-96 absolute top-20 right-0 bg-light-100 dark:bg-dark-300 rounded-lg shadow-lg`}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={containerVariant}
          >
            <motion.div
              className="flex gap-2 mb-4 items-center"
              variants={itemVariant}
            >
              <UserAvatar size="medium" username={username!} />
              <div className="flex flex-col w-fit text-dark-50 dark:text-light-400">
                <span>{username}</span>
                <span>{email}</span>
              </div>
            </motion.div>
            {menuItems.map((item) => (
              <motion.li
                key={item.name}
                variants={itemVariant}
                onClick={() => dispatch(onToggleMenu())}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 p-2 border rounded-lg text-dark-300 dark:text-light-100 bg-light-300 dark:bg-dark-400  transition-all duration-150"
                      : "flex items-center gap-2 p-2 border rounded-lg text-dark-300 dark:text-light-100 hover:bg-light-300 dark:hover:bg-dark-400  transition-all duration-150"
                  }
                >
                  <div className="text-xl">{item.icon}</div>
                  <span>{item.name}</span>
                </NavLink>
              </motion.li>
            ))}

            <motion.div
              className="flex items-center gap-2  border rounded-lg text-dark-300 dark:text-light-100 hover:bg-light-300 dark:hover:bg-dark-400  transition-all duration-150"
              variants={itemVariant}
              onClick={() => dispatch(onToggleMenu())}
            >
              <button
                className="w-full p-2"
                onClick={() => dispatch(onLogout())}
              >
                <span className="flex gap-2 items-center">
                  <MdLogout className="text-xl" /> Salir
                </span>
              </button>
            </motion.div>
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};
