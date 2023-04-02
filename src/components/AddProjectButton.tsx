import { IoMdAdd } from "react-icons/io";

export const AddProjectButton: React.FC = () => {
  return (
    <button
      className="w-12 h-12 m-2 fixed bottom-4 right-4 bg-primary-50 hover:bg-primary-100 rounded-full shadow-2xl flex items-center justify-center"
      title="Crear proyecto"
    >
      <IoMdAdd className="text-2xl text-light-100" />
    </button>
  );
};
