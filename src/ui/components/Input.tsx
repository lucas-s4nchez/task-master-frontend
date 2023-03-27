export const Input = (props: any) => {
  return (
    <div className="flex flex-col mt-4">
      <label
        htmlFor={props.id}
        className={`cursor-pointer  duration-300 transform mb-1  px-2 ${
          props.isError ? "text-error-100" : "text-light-100 dark:text-dark-100"
        }`}
      >
        {props.label}
      </label>
      <input
        type={props.type}
        autoComplete="off"
        className={`w-full rounded bg-light-200 dark:bg-dark-200 text-light-100 dark:text-dark-100 py-4 px-2 outline-none transition-all duration-200 ease-linear ${
          props.isError
            ? "border border-red-600 focus:border-red-700"
            : "focus:border border-blue-600"
        }`}
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
      />
      {props.isError && (
        <p className="text-red-600 text-xs py-1 px-2">{props.errorMessage}</p>
      )}
    </div>
  );
};
