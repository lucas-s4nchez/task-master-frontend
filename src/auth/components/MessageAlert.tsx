import { Alert, Snackbar } from "@mui/material";
import { IMessageAlerProps } from "../../interfaces";

export const MessageAlert: React.FC<IMessageAlerProps> = ({
  message,
}: IMessageAlerProps) => {
  return (
    <Snackbar open={!!message} autoHideDuration={6000}>
      <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
