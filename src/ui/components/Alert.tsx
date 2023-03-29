import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export const Alert = ({ variant, children }: any) => {
  const [isOpenAlert, setIsOpenAlert] = useState(true);
  return (
    <div
      className={`${
        isOpenAlert ? "block" : "hidden"
      } p-3 fixed z-50 top-0 right-0 m-3 w-max max-w-fit rounded text-light-100 ${
        variant === "error" && "bg-red-50"
      } ${variant === "success" && "bg-green"}`}
    >
      <div className="flex gap-2">
        <span>{children}</span>
        <button
          className="self-start sm:self-center"
          onClick={() => setIsOpenAlert(false)}
        >
          <AiOutlineClose className="text-xl" />
        </button>
      </div>
    </div>
  );
};
