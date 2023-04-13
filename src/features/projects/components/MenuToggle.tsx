import { motion } from "framer-motion";
import { useUiStore } from "../../../hooks";

const transition = { duration: 0.3 };

export const MenuToggle: React.FC = () => {
  const { isOpenMenu, themeMode, handleToggleMenu } = useUiStore();
  return (
    <button
      className="z-50 cursor-pointer p-2 rounded-full hover:bg-light-200 dark:hover:bg-dark-200 "
      onClick={handleToggleMenu}
    >
      <div className="flex items-center justify-center">
        <svg viewBox="0 0 20 20" width="23" height="23">
          <motion.path
            fill="transparent"
            strokeLinecap="round"
            strokeWidth="3"
            animate={isOpenMenu ? "open" : "closed"}
            initial={false}
            variants={{
              closed: {
                d: "M 2 2.5 L 20 2.5",
                stroke:
                  themeMode === "dark"
                    ? "hsl(220, 14%, 95%)"
                    : "hsl(220, 39%, 10.0%)",
              },
              open: {
                d: "M 3 16.5 L 17 2.5",
                stroke:
                  themeMode === "dark"
                    ? "hsl(220, 14%, 95%)"
                    : "hsl(220, 39%, 10.0%)",
              },
            }}
            transition={transition}
          />
          <motion.path
            fill="transparent"
            strokeLinecap="round"
            strokeWidth="3"
            d="M 2 9.423 L 20 9.423"
            stroke={`${
              themeMode === "dark"
                ? "hsl(220, 14%, 95%)"
                : "hsl(220, 39%, 10.0%)"
            }`}
            animate={isOpenMenu ? "open" : "closed"}
            initial={false}
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={transition}
          />
          <motion.path
            fill="transparent"
            strokeLinecap="round"
            strokeWidth="3"
            animate={isOpenMenu ? "open" : "closed"}
            initial={false}
            variants={{
              closed: {
                d: "M 2 16.346 L 20 16.346",
                stroke:
                  themeMode === "dark"
                    ? "hsl(220, 14%, 95%)"
                    : "hsl(220, 39%, 10.0%)",
              },
              open: {
                d: "M 3 2.5 L 17 16.346",
                stroke:
                  themeMode === "dark"
                    ? "hsl(220, 14%, 95%)"
                    : "hsl(220, 39%, 10.0%)",
              },
            }}
            transition={transition}
          />
        </svg>
      </div>
    </button>
  );
};
