import { IAuthLayoutProps } from "../../interfaces";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { onDarkMode, onLightMode } from "../../store/ui/uiSlice";

export const AuthLayout: React.FC<IAuthLayoutProps> = ({
  children,
  title,
}: IAuthLayoutProps) => {
  const { themeMode } = useSelector((state) => (state as RootState).ui);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen grid place-items-center bg-white dark:bg-black">
      <div className="custom-container">
        <div className="sm:w-[32rem] p-5 md:p-8 rounded shadow-lg mx-auto bg-gray-200 dark:bg-zinc-800">
          <h5 className="text-2xl mb-2">{title}</h5>
          <button
            className="bg-red-600"
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
          {children}
        </div>
      </div>
    </div>
  );
};
