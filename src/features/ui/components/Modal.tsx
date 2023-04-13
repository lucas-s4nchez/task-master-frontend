import { motion, AnimatePresence } from "framer-motion";
import { IModalComponentProps } from "../models";
import { MdClose } from "react-icons/md";

const modalContainerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
};
const modalItemVariant = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
};

export const Modal: React.FC<IModalComponentProps> = ({
  isOpenModal,
  handleCloseModal,
  title,
  children,
}: IModalComponentProps) => {
  return (
    <AnimatePresence>
      {isOpenModal && (
        <motion.div
          className="fixed top-0 z-50 left-0 w-full h-full flex justify-center items-center bg-dark-400 bg-opacity-30 backdrop-blur-sm"
          onClick={handleCloseModal}
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={modalContainerVariant}
        >
          <motion.div
            className="flex flex-col gap-2 rounded-md shadow-2xl w-11/12 max-w-xl m-auto p-4 bg-light-100 dark:bg-dark-300 "
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={modalItemVariant}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex flex-col">
              <button
                className={`self-end p-1 rounded-full hover:bg-light-300 dark:hover:bg-dark-200 text-dark-300 dark:text-light-100`}
                onClick={handleCloseModal}
              >
                <MdClose />
              </button>
              <h2 className="text-lg font-semibold pr-5 text-dark-300 dark:text-light-100">
                {title}
              </h2>
            </div>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
