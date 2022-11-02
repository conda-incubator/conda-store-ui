import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface IPopupInterface {
  description: string | null;
  isVisible: boolean;
  onClose: (notification: any) => void;
}
export const Popup = ({ description, isVisible, onClose }: IPopupInterface) => {
  const handleClose = () => {
    onClose({
      show: !isVisible,
      description: null
    });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={5000}
      open={isVisible}
      onClose={handleClose}
    >
      <Alert severity="success" sx={{ width: "100%" }} onClose={handleClose}>
        {description}
      </Alert>
    </Snackbar>
  );
};
