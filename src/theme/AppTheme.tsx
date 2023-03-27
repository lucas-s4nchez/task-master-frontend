import { CssBaseline, ThemeProvider } from "@mui/material";
import { IChildrenProps } from "../interfaces";
import { lightTheme } from "./themes";

export const AppTheme: React.FC<IChildrenProps> = ({
  children,
}: IChildrenProps) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
