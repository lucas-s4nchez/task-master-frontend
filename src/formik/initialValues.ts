import {
  IAddCollaboratorFormValues,
  IAddProjectFormValues,
  IAddTaskFormValues,
  ILoginFormValues,
  IRegisterFormValues,
} from "../models/formik";

export const loginInitialValues: ILoginFormValues = {
  email: "",
  password: "",
};

export const registerInitialValues: IRegisterFormValues = {
  username: "",
  email: "",
  password: "",
};

export const addCollaboratorInitialValues: IAddCollaboratorFormValues = {
  email: "",
};

export const addProjectInitialValues: IAddProjectFormValues = {
  title: "",
  description: "",
};

export const addTaskInitialValue: IAddTaskFormValues = {
  title: "",
  description: "",
  assignedTo: [],
};
