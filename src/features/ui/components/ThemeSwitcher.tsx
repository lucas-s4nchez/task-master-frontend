import { motion } from "framer-motion";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useUiStore } from "../../../hooks";

export const ThemeSwitcher: React.FC = () => {
  const { themeMode, handleThemeMode } = useUiStore();
  return (
    <div
      className={`w-14 h-9 bg-light-400 opacity-75 flex ${
        themeMode === "dark" ? "justify-end" : "justify-start"
      } rounded-3xl p-1 cursor-pointer`}
      onClick={handleThemeMode}
    >
      <motion.div
        className={`h-7 w-7 rounded-full  ${
          themeMode === "dark" ? "bg-dark-300" : "bg-light-100"
        } flex items-center justify-center`}
        layout
      >
        {themeMode === "light" ? (
          <BsFillSunFill className="text-xl text-dark-400" />
        ) : (
          <BsFillMoonStarsFill className="text-xl  text-light-50" />
        )}
      </motion.div>
    </div>
  );
};
