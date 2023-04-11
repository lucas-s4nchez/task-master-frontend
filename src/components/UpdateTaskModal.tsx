import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, Input, Modal } from "../ui/components";
import { useUpdateTasksMutation } from "../store/api/apiSlice";
import { ICustomFetchBaseQueryError } from "../interfaces/data";
import { IUpdateTaskModalProps } from "../interfaces/componentsProps";
import { useFormik } from "formik";
import { addProjectValidationSchema } from "../formik";
import { useTasksStore } from "../hooks";

export const UpdateTaskModal: React.FC<IUpdateTaskModalProps> = ({
  projectId,
  isOpenModal,
  handleCloseModal,
}: IUpdateTaskModalProps) => {
  const { activeTask, handleSetActiveTask } = useTasksStore();
  const [updateTask, { data, isLoading, isSuccess, isError, error }] =
    useUpdateTasksMutation();
  const [isProjectModified, setIsProjectModified] = useState(false);

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
    initialValues: { ...activeTask },
    validationSchema: addProjectValidationSchema,
    onSubmit: async (values) => {
      await updateTask({
        projectId: projectId,
        id: activeTask?._id,
        title: values.title,
        description: values.description,
        assignedTo: activeTask?.assignedTo.map((user) => user._id),
      });
      handleSetActiveTask({
        ...activeTask!,
        title: values.title!,
        description: values.description!,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg);
      resetForm({ values });
      handleCloseModal();
    }
    if (isError) {
      toast.error((error as ICustomFetchBaseQueryError).data?.msg);
    }
  }, [data, isSuccess, isError, error]);

  useEffect(() => {
    setIsProjectModified(
      activeTask?.title.trim() !== values.title!.trim() ||
        activeTask?.description.trim() !== values.description!.trim()
    );
  }, [values, activeTask]);

  return (
    <Modal
      isOpenModal={isOpenModal}
      handleCloseModal={() => {
        handleCloseModal();
        resetForm();
      }}
      title={`Editando la tarea "${activeTask?.title}"`}
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
              disabled={isLoading || !isProjectModified}
            >
              Guardar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
