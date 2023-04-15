import { useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { Button, Input, Modal } from "../../ui/components";
import {
  addProjectInitialValues,
  addProjectValidationSchema,
} from "../../../formik";
import { useCreateProjectMutation } from "../services/projectsApi";
import { IAddProjectModalProps } from "../../../models/components";
import { ICustomFetchBaseQueryError } from "../../../models/store/error";

export const AddProjectModal: React.FC<IAddProjectModalProps> = ({
  isOpenModal,
  handleCloseModal,
}: IAddProjectModalProps) => {
  const [createProject, { data, isLoading, isSuccess, isError, error }] =
    useCreateProjectMutation();
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
    initialValues: addProjectInitialValues,
    validationSchema: addProjectValidationSchema,
    onSubmit: async (values) => {
      await createProject({
        title: values.title,
        description: values.description,
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
  }, [isSuccess, isError, error]);
  return (
    <Modal
      isOpenModal={isOpenModal}
      handleCloseModal={handleCloseModal}
      title="Crear un nuevo proyecto"
    >
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <Input
          id="inputTitle"
          type="text"
          name="title"
          label="Título:"
          placeholder="Escribe un título"
          value={values.title}
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
          value={values.description}
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
              disabled={isLoading}
            >
              Crear Proyecto
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
