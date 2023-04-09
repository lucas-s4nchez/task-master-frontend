import { useFormik } from "formik";
import { IAddCollaboratorModalProps } from "../interfaces/componentsProps";
import { Button, Input, Modal } from "../ui/components";
import {
  addCollaboratorInitialValues,
  addCollaboratorValidationSchema,
} from "../formik";
import { useSendProjectInvitationMutation } from "../store/api/apiSlice";

export const AddCollaboratorModal: React.FC<IAddCollaboratorModalProps> = ({
  projectId,
  isOpenModal,
  handleCloseModal,
}: IAddCollaboratorModalProps) => {
  const [sendInvitation, { isLoading }] = useSendProjectInvitationMutation();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: addCollaboratorInitialValues,
      validationSchema: addCollaboratorValidationSchema,
      onSubmit: async (values) => {
        await sendInvitation({ projectId: projectId, email: values.email });
      },
    });
  return (
    <Modal
      isOpenModal={isOpenModal}
      handleCloseModal={handleCloseModal}
      title="Invitar usuario"
    >
      <form onSubmit={handleSubmit}>
        <Input
          id="inputCollaborator"
          type="email"
          name="email"
          label="Correo electronico:"
          placeholder="Email del usuario"
          value={values.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          isError={touched.email && !!errors.email}
          errorMessage={errors.email}
        />
        <div className="mt-2">
          <Button size="medium" bgColor="primary" type="submit" fullWidth>
            Invitar
          </Button>
        </div>
      </form>
    </Modal>
  );
};
