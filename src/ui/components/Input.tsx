export const Input = (props: any) => {
  return (
    <div className="flex flex-col mt-4">
      <label
        htmlFor={props.id}
        className={`cursor-pointer text-gray-700 duration-300 transform mb-1  px-2 ${
          props.isError ? "text-red-600" : "text-gray-700"
        }`}
      >
        {props.label}
      </label>
      <input
        type={props.type}
        autoComplete="off"
        className={`w-full rounded border py-4 px-2 outline-none transition-all duration-200 ease-linear ${
          props.isError
            ? "border-red-600 focus:border-red-700"
            : "border-gray-400 focus:border-blue-500"
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
