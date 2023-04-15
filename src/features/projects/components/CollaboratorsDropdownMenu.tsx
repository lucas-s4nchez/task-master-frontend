import { AnimatePresence, motion } from "framer-motion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useProjectsStore } from "../../../hooks";
import { useState } from "react";
import { ICollaboratorsDropdownMenu } from "../../../models/components";

const dropdownContainerVariant = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
};

export const CollaboratorsDropdownMenu: React.FC<ICollaboratorsDropdownMenu> = (
  props: ICollaboratorsDropdownMenu
) => {
  const { activeProject } = useProjectsStore();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const checkboxOptions = activeProject?.collaborators.map(
    (collaborator) => collaborator.user
  );

  return (
    <div className="flex flex-col mt-6 gap-1 ">
      <div
        className={`cursor-pointer duration-300 transform mb-1 rounded p-3  bg-light-200 dark:bg-dark-200 ${
          props.isError ? "text-red-100" : "text-dark-300 dark:text-light-100"
        }`}
        onClick={() => setIsOpenDropdown((prev) => !prev)}
      >
        <span className="flex justify-between items-center">
          Asignar tarea a:{" "}
          {isOpenDropdown ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </span>
      </div>
      <AnimatePresence>
        {isOpenDropdown && (
          <motion.div
            className={`h-20 overflow-y-scroll bg-light-200 dark:bg-dark-200 p-2 rounded scrollbar-thin scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-thumb-primary-50 scrollbar-track-light-400`}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={dropdownContainerVariant}
          >
            {checkboxOptions!.map((option) => {
              return (
                <div
                  key={option._id}
                  className="flex w-full items-center justify-center gap-2 border-b-[1px] border-b-gray-100 dark:border-b-dark-50 hover:border-gray-200 dark:hover:border-dark-100"
                >
                  <input
                    type="checkbox"
                    id={option._id}
                    name="assignedTo"
                    value={option._id}
                    checked={props.value.includes(option._id)}
                    onChange={props.handleChange}
                    className="peer h-5 w-5 shrink-0 rounded-sm hover:ring-2 hover:ring-primary-50 hover:ring-opacity-70"
                  />
                  <label
                    htmlFor={option._id}
                    className=" text-sm w-full p-2 cursor-pointer font-medium text-dark-300 dark:text-light-100  peer-checked:text-primary-100 peer-checked:text-base"
                  >
                    {option.email}
                  </label>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      {props.isError && (
        <p className="text-red-100 text-xs py-1 px-2">{props.errorMessage}</p>
      )}
    </div>
  );
};
