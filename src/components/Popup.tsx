import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface IPopupInterface {
  description: string | null;
  isVisible: boolean;
  onClose: (notification: any) => void;
}
export const Popup = ({ description, isVisible, onClose }: IPopupInterface) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={5000}
      open={isVisible}
      onClose={() =>
        onClose({
          show: !isVisible,
          description: null
        })
      }
    >
      <Alert severity="success" sx={{ width: "100%" }}>
        {description}
      </Alert>
    </Snackbar>
  );
};
