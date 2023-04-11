import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { IAddTaskModalProps } from "../interfaces/componentsProps";
import { Button, Input, Modal } from "../ui/components";
import { addTaskInitialValue, addTaskValidationSchema } from "../formik";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useCreateTaskMutation } from "../store/api/apiSlice";
import { ICustomFetchBaseQueryError } from "../interfaces/data";

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

export const AddTaskModal: React.FC<IAddTaskModalProps> = ({
  projectId,
  projectCollaborators,
  isOpenModal,
  handleCloseModal,
}: IAddTaskModalProps) => {
  const [createTask, { isLoading, data, error, isError, isSuccess }] =
    useCreateTaskMutation();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const checkboxOptions = projectCollaborators.map(
    (collaborator) => collaborator.user
  );

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    handleReset,
  } = useFormik({
    initialValues: { ...addTaskInitialValue },
    validationSchema: addTaskValidationSchema,
    onSubmit: async (values) => {
      await createTask({
        projectId: projectId,
        title: values.title,
        description: values.description,
        assignedTo: values.assignedTo,
      });
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg);
      resetForm();
      handleCloseModal();
    }
    if (isError) {
      toast.error((error as ICustomFetchBaseQueryError).data?.msg);
    }
  }, [data, isSuccess, isError, error]);
  return (
    <Modal
      isOpenModal={isOpenModal}
      handleCloseModal={handleCloseModal}
      title="Crear nueva tarea"
    >
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <Input
          id="inputTitle"
          type="text"
          name="title"
          label="Título:"
          placeholder="Escribe un título"
          value={values.title!}
          handleChange={handleChange}
          handleBlur={handleBlur}
          isError={touched.title && !!errors.title}
          errorMessage={errors.title}
        />
        <Input
          id="inputDescription"
          type="text"
          name="description"
          label="Descripción:"
          placeholder="Escribe una descripción"
          value={values.description!}
          handleChange={handleChange}
          handleBlur={handleBlur}
          isError={touched.description && !!errors.description}
          errorMessage={errors.description}
        />
        <div className="flex flex-col mt-6 gap-1 ">
          <div
            className={`cursor-pointer duration-300 transform mb-1 rounded p-3  bg-light-200 dark:bg-dark-200 ${
              touched.assignedTo && !!errors.assignedTo
                ? "text-red-100"
                : "text-dark-300 dark:text-light-100"
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
                {checkboxOptions.map((option) => {
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
                        checked={values.assignedTo.includes(option._id)}
                        onChange={handleChange}
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
          {touched.assignedTo && !!errors.assignedTo && (
            <p className="text-red-100 text-xs py-1 px-2">
              {errors.assignedTo}
            </p>
          )}
        </div>
        <div className="flex mt-8 mb-4 justify-end">
          <div className="flex flex-col gap-2 w-full  sm:w-2/3 sm:flex-row">
            <Button
              size="medium"
              bgColor="red"
              type="reset"
              fullWidth
              disabled={isLoading}
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
            <Button
              size="medium"
              bgColor="primary"
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              Guardar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
