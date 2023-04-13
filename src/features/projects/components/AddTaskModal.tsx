import { useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { IAddTaskModalProps } from "../../../models/componentsProps";
import { Button, Input, Modal } from "../../ui/components";
import { addTaskInitialValue, addTaskValidationSchema } from "../../../formik";
import { ICustomFetchBaseQueryError } from "../../../models/data";
import { CollaboratorsDropdownMenu } from "./CollaboratorsDropdownMenu";
import { useCreateTaskMutation } from "../services/projectsApi";

export const AddTaskModal: React.FC<IAddTaskModalProps> = ({
  projectId,
  isOpenModal,
  handleCloseModal,
}: IAddTaskModalProps) => {
  const [createTask, { isLoading, data, error, isError, isSuccess }] =
    useCreateTaskMutation();

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
        <CollaboratorsDropdownMenu
          value={values.assignedTo}
          handleChange={handleChange}
          isError={touched.assignedTo && !!errors.assignedTo}
          errorMessage={errors.assignedTo}
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
