import { useDispatch, useSelector } from "react-redux";
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
        <div className="flex justify-center">
          <Logo size="large" />
        </div>
        <div className="sm:w-[32rem] p-5 md:p-8 rounded mx-auto mt-6">
          <h5 className="text-3xl text-dark-300 dark:text-light-100 mb-2">
            {title}
          </h5>
          {children}
        </div>
      </div>
    </div>
  );
};
