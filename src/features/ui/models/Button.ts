export interface IButtonComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  size: "small" | "medium" | "large";
  bgColor: "primary" | "red" | "green" | "blue" | "yellow";
}
