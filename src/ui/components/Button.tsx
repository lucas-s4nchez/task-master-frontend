import { IButtonComponentProps } from "../interfaces";

const smallSize = `px-2 py-1 text-xs `;
const mediumSize = `px-2 py-[0.40rem] text-sm `;
const largeSize = `px-4 py-2 text-base`;
const bgPrimary = "bg-primary-50 hover:bg-primary-100";
const bgRed = "bg-red-50 hover:bg-red-100";
const bgGreen = "bg-green-50 hover:bg-green-100";
const bgBlue = "bg-blue-50 hover:bg-blue-100";
const bgYellow = "bg-yellow-50 hover:bg-yellow-100";

export const Button: React.FC<IButtonComponentProps> = (
  props: IButtonComponentProps
) => {
  const { type, fullWidth, bgColor, size, disabled, ...rest } = props;
  return (
    <button
      type={props.type}
      className={`font-medium uppercase text-light-100 rounded-md shadow transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed  
      ${props.fullWidth ? "flex justify-center items-center w-full" : "w-fit"}
      ${props.bgColor === "primary" && bgPrimary} 
      ${props.bgColor === "red" && bgRed}
      ${props.bgColor === "green" && bgGreen}
      ${props.bgColor === "blue" && bgBlue}
      ${props.bgColor === "yellow" && bgYellow}
      ${props.size === "small" && smallSize} 
      ${props.size === "medium" && mediumSize} 
      ${props.size === "large" && largeSize}`}
      disabled={props.disabled}
      {...rest}
    >
      {props.children}
    </button>
  );
};
