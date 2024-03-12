import React from "react";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import { FormControl, InputLabel, Theme, styled } from "@mui/material";
import useId from "@mui/material/utils/useId";

const StyledInput = styled(InputBase)(({ theme }: { theme: Theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3)
  },
  "& .MuiInputBase-input": {
    borderRadius: 2,
    position: "relative",
    border: "1px solid",
    borderColor: theme.palette.secondary.main,
    fontSize: "13px",
    padding: "10px 12px",
    "&:focus": {
      borderColor: theme.palette.primary.main
    },
    "&.Mui-disabled": {
      backgroundColor: theme.palette.secondary[100],
      borderColor: theme.palette.secondary[100],
      color: theme.palette.secondary[500],
      "-webkit-text-fill-color": "unset"
    }
  }
}));

interface ICustomizedTextFieldProps extends InputBaseProps {
  label: string;
}

export const CustomizedTextField = (props: ICustomizedTextFieldProps) => {
  const id = useId();
  const { label, fullWidth, ..._props } = props;
  return (
    <FormControl variant="standard" fullWidth={fullWidth}>
      <InputLabel
        shrink
        htmlFor={id}
        sx={{
          fontSize: "13px",
          fontWeight: 500,
          color: "#333",
          transform: "none"
        }}
      >
        {label}
      </InputLabel>
      <StyledInput id={id} {..._props} />
    </FormControl>
  );
};
