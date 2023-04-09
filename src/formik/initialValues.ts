import {
  IAddCollaboratorInitialValues,
  IAddProjectInitialValues,
  ILoginCredentials,
  IRegisterCredentials,
} from "../interfaces/data";

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
