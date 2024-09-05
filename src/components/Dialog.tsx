import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledButton } from "../styles";

interface IAlertDialog {
  title: string;
  description: string;
  isOpen: boolean;
  closeAction: () => void;
  confirmAction: () => void;
  confirmText?: string;
}

export const AlertDialog = ({
  title,
  description,
  isOpen,
  closeAction,
  confirmAction,
  confirmText = "Delete"
}: IAlertDialog) => {
  return (
    <Dialog open={isOpen} onClose={closeAction}>
      <DialogTitle
        sx={{
          fontFamily: '"Inter", sans-serif',
          fontSize: "16px",
          color: "#333",
          fontWeight: 600
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            fontSize: "13px",
            fontFamily: '"Inter", sans-serif',
            color: "#333"
          }}
        >
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={closeAction}>
          Cancel
        </Button>
        <StyledButton
          color="primary"
          onClick={() => confirmAction()}
          sx={{ textTransform: "uppercase" }}
        >
          {confirmText}
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};
