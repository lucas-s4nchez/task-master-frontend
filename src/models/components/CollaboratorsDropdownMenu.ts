import { ChangeEvent } from "react";

export interface ICollaboratorsDropdownMenu {
  value: string[];
  handleChange: (eventOrPath: string | ChangeEvent<any>) => void;
  isError: boolean | undefined;
  errorMessage: string[] | string | undefined;
}
