import {
  onDarkMode,
  onLightMode,
  onToggleMenu,
  onToggleTask,
} from "../store/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "./store";

export const useUiStore = () => {
  const { themeMode, isOpenMenu, isOpenTask } = useAppSelector(
    (state) => state.ui
  );
  const dispatch = useAppDispatch();

  const handleToggleMenu = () => {
    dispatch(onToggleMenu());
  };
  const handleToggleTask = () => {
    dispatch(onToggleTask());
  };
  const handleThemeMode = () => {
    if (themeMode === "light") {
      dispatch(onDarkMode());
    } else {
      dispatch(onLightMode());
    }
  };

  return {
    themeMode,
    isOpenMenu,
    isOpenTask,
    handleThemeMode,
    handleToggleMenu,
    handleToggleTask,
  };
};
