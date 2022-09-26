import React from "react";
import Alert, { AlertColor } from "@mui/material/Alert";

interface ILoginAlertProps {
  severity: AlertColor;
  visible: boolean;
  message: string;
}

export const LoginAlert = ({
  severity,
  visible,
  message
}: ILoginAlertProps) => {
  return (
    <>
      {visible && (
        <Alert
          severity={severity}
          sx={{
            mb: "20px"
          }}
        >
          {message}
        </Alert>
      )}
    </>
  );
};