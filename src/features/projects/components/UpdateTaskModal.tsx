import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, Input, Modal } from "../../ui/components";
import { ICustomFetchBaseQueryError } from "../../../models/data";
import { IUpdateTaskModalProps } from "../../../models/componentsProps";
import { useFormik } from "formik";
import { addTaskValidationSchema } from "../../../formik";
import { useProjectsStore, useTasksStore } from "../../../hooks";
import { CollaboratorsDropdownMenu } from "./CollaboratorsDropdownMenu";
import { useUpdateTasksMutation } from "../services/tasksApi";

export const UpdateTaskModal: React.FC<IUpdateTaskModalProps> = ({
  task,
  isOpenModal,
  handleCloseModal,
}: IUpdateTaskModalProps) => {
  const { activeTask, handleSetActiveTask } = useTasksStore();
  const { activeProject } = useProjectsStore();
  const [updateTask, { data, isLoading, isSuccess, isError, error }] =
    useUpdateTasksMutation();
  const [isTaskModified, setIsTaskModified] = useState(false);

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
    initialValues: {
      title: task?.title,
      description: task?.description,
      assignedTo: task?.assignedTo.map((user) => user._id)!,
    },
    validationSchema: addTaskValidationSchema,
    onSubmit: async (values) => {
      const usersAssigned = values.assignedTo
        .map((value) =>
          activeProject?.collaborators.find(
            (collaborator) => collaborator.user._id === value
          )
        )
        .map((collaboartor) => collaboartor?.user!);

      await updateTask({
        projectId: activeProject?._id,
        id: task?._id,
        title: values.title,
        description: values.description,
        assignedTo: values.assignedTo,
      });

      handleSetActiveTask({
        ...activeTask!,
        title: values.title!,
        description: values.description!,
        assignedTo: usersAssigned,
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
    setIsTaskModified(
      task?.title.trim() !== values.title!.trim() ||
        task?.description.trim() !== values.description!.trim() ||
        JSON.stringify(task.assignedTo.map((user) => user._id)) !==
          JSON.stringify(values.assignedTo!)
    );
  }, [values, task]);

  return (
    <Modal
      isOpenModal={isOpenModal}
      handleCloseModal={() => {
        handleCloseModal();
        resetForm();
      }}
      title={`Editando la tarea "${task?.title}"`}
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
              disabled={isLoading || !isTaskModified}
            >
              Guardar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
