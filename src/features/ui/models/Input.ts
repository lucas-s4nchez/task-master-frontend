import { ChangeEvent, FocusEvent } from "react";

export interface IInputComponentProps {
  id: string;
  type: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  handleChange: (eventOrPath: string | ChangeEvent<any>) => void;
  handleBlur: (eventOrString: string | FocusEvent<any>) => void;
  isError: boolean | undefined;
  errorMessage: string | undefined;
}
