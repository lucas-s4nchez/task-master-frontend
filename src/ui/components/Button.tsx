import { IButtonComponentProps } from "../interfaces";

export const Button: React.FC<IButtonComponentProps> = (
  props: IButtonComponentProps
) => {
  return (
    <button
      type={props.type}
      className={`font-medium uppercase text-light-100 py-2 px-3 bg-primary-50 hover:bg-primary-100 rounded-md shadow transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-50 ${
        props.fullWidth ? "flex justify-center items-center w-full" : ""
      }`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
