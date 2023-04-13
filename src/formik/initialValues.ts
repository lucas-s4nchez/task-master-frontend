import {
  IAddCollaboratorInitialValues,
  IAddProjectInitialValues,
  IAddTaskInitialValues,
  ILoginCredentials,
  IRegisterCredentials,
} from "../models/data";

export const loginInitialValues: ILoginCredentials = {
  email: "",
  password: "",
};

export const registerInitialValues: IRegisterCredentials = {
  username: "",
  email: "",
  password: "",
};

export const addCollaboratorInitialValues: IAddCollaboratorInitialValues = {
  email: "",
};

export const addProjectInitialValues: IAddProjectInitialValues = {
  title: "",
  description: "",
};

export const addTaskInitialValue: IAddTaskInitialValues = {
  title: "",
  description: "",
  assignedTo: [],
};
