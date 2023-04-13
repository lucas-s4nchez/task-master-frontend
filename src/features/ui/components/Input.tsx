import { IInputComponentProps } from "../models";

export const Input: React.FC<IInputComponentProps> = (
  props: IInputComponentProps
) => {
  return (
    <div className="flex flex-col mt-4">
      <label
        htmlFor={props.id}
        className={`cursor-pointer  duration-300 transform mb-1  px-2 ${
          props.isError ? "text-red-100" : "text-dark-300 dark:text-light-100"
        }`}
      >
        {props.label}
      </label>
      <input
        type={props.type}
        autoComplete="off"
        className={`w-full rounded bg-light-200 dark:bg-dark-200 text-dark-300 dark:text-light-100 py-4 px-2 outline-none transition-all duration-200 ease-linear ${
          props.isError
            ? "border border-red-100"
            : "focus:border border-primary-50"
        }`}
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
      />
      {props.isError && (
        <p className="text-red-100 text-xs py-1 px-2">{props.errorMessage}</p>
      )}
    </div>
  );
};
