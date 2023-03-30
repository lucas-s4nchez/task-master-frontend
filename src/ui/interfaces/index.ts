import { ChangeEvent, FocusEvent } from "react";

export interface IAlertComponentProps {
  variant: "error" | "success";
  children: React.ReactNode;
}
export interface IButtonComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}
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
export interface ILogoComponentProps {
  size: "small" | "medium" | "large";
}
