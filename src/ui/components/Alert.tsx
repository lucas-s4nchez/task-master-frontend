import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { BiError, BiCheckCircle } from "react-icons/bi";
import { IAlertComponentProps } from "../interfaces";

export const Alert: React.FC<IAlertComponentProps> = ({
  variant,
  children,
}: IAlertComponentProps) => {
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(true);
  return (
    <>
      <AnimatePresence>
        {isOpenAlert && (
          <motion.div
            className={`${
              isOpenAlert ? "block" : "hidden"
            } p-3 fixed z-50 top-0 right-0 m-3 w-max max-w-fit rounded text-light-100 ${
              variant === "error" && "bg-red-50"
            } ${variant === "success" && "bg-green"}`}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "tween" }}
          >
            <div className="flex gap-2">
              {variant === "error" && (
                <BiError className="text-xl self-center" />
              )}
              {variant === "success" && (
                <BiCheckCircle className="text-xl self-center" />
              )}
              <span>{children}</span>
              <button
                className="self-start sm:self-center"
                onClick={() => setIsOpenAlert(false)}
              >
                <AiOutlineClose className="text-xl ml-1" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
