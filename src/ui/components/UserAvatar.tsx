import { IUserAvatarComponentProps } from "../interfaces";

export const UserAvatar: React.FC<IUserAvatarComponentProps> = ({
  username,
  size,
  bgColor,
}: IUserAvatarComponentProps) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full 
      ${size === "small" && "w-8 h-8 text-xl"} 
      ${size === "medium" && "w-11 h-11 text-2xl"} 
      ${size === "large" && "w-14 h-14"}
      ${bgColor ? `bg-${bgColor}-100` : "bg-primary-50"}`}
    >
      <span
        className={`uppercase text-light-100 leading-[0rem] ${
          size === "small" && "text-xl"
        } ${size === "medium" && "text-2xl"} ${size === "large" && "text-3xl"}`}
      >
        {username.charAt(0)}
      </span>
    </div>
  );
};
