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
    <div className="min-h-screen grid place-items-center bg-light-100 dark:bg-dark-100">
      <div className="custom-container">
        <div className="sm:w-[32rem] p-5 md:p-8 rounded mx-auto">
          <h5 className="text-2xl text-light-100 dark:text-dark-100 mb-2">
            {title}
          </h5>
          <button
            className="bg-red-600 p-2"
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
