import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledIconButton } from "src/styles";

interface IAddRequestedPackageProps {
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (packageName: string) => void;
}

const AddRequestedPackage = ({
  onCancel,
  onSubmit
}: IAddRequestedPackageProps) => {
  const [name, setName] = useState<string>("");

  const handleSubmit = (packageName: string) => {
    if (name) {
      onSubmit(packageName);
      onCancel(false);
    }
  };

  const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (name) {
        handleSubmit(name);
      }
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
      <Box sx={{ marginRight: "160px" }}>
        <Autocomplete
          freeSolo
          options={["python", "pandas"]}
          onChange={(e, value) => {
            setName(value ?? "");
          }}
          sx={{ width: "140px" }}
          renderInput={params => (
            <TextField
              autoFocus
              {...params}
              label="Enter package"
              onChange={e => setName(e.target.value)}
              onBlur={() => handleSubmit(name)}
              onKeyDown={keyPress}
              size="small"
            />
          )}
        />
      </Box>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "154px" }} />
          <StyledIconButton
            onClick={() => onCancel(false)}
            sx={{ marginLeft: "24px" }}
          >
            <DeleteIcon />
          </StyledIconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AddRequestedPackage;
