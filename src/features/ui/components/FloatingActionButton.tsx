import { IFloatingActionButtonProps } from "../models";

export const FloatingActionButton: React.FC<IFloatingActionButtonProps> = ({
  children,
  position,
  bgColor,
  handleOpenModal,
  title,
}: IFloatingActionButtonProps) => {
  return (
    <button
      className={`w-12 h-12 m-2 fixed bottom-4 ${
        position === "right" ? "right-4" : "left-4"
      } bg-${bgColor}-50 hover:bg-${bgColor}-100 rounded-full shadow-2xl flex items-center justify-center`}
      title={title}
      onClick={handleOpenModal}
    >
      {children}
    </button>
  );
};
