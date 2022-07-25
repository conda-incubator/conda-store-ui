import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

import { StyledIconButton } from "src/styles";

interface IAddRequestedPackageProps {
  /**
   * @param onCancel handler that will run when delete icon is clicked
   * @param onSubmit handler that will run when input losses focus
   */
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (packageName: string) => void;
}

export const AddRequestedPackage = ({
  onCancel,
  onSubmit
}: IAddRequestedPackageProps) => {
  const [name, setName] = useState<string>("");

  const handleSubmit = () => {
    if (name) {
      onSubmit(name);
      onCancel(false);
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
              onBlur={handleSubmit}
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
