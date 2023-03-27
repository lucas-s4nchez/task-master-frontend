export const Button = (props: any) => {
  return (
    <button
      type={props.type}
      className={`font-semibold uppercase text-dark-100 py-2 px-3 bg-primary-100 hover:bg-primary-200 rounded-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-100 ${
        props.fullWidth ? "flex justify-center items-center w-full" : ""
      }`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
