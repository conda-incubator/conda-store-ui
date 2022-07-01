import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import StyledIconButton from "../../styles/StyledIconButton";
import ConstraintSelect from "../ConstraintSelect";
import VersionSelect from "../VersionSelect";

interface IAddRequestedPackageProps {
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddRequestedPackage = ({ onCancel }: IAddRequestedPackageProps) => {
  const [name, setName] = useState<string | null>(null);
  const [showSelect, setShowSelect] = useState(false);

  const setFields = () => {
    if (name) {
      setShowSelect(true);
      return;
    }

    setShowSelect(false);
  };

  const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setFields();
      e.currentTarget.blur();
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
      <Box sx={{ marginRight: "160px" }}>
        <Autocomplete
          freeSolo
          options={["python", "pandas"]}
          onChange={(e, value) => {
            setName(value);
          }}
          sx={{ width: "140px" }}
          renderInput={params => (
            <TextField
              autoFocus
              {...params}
              label="Enter package"
              onChange={e => setName(e.target.value)}
              onBlur={() => setFields()}
              onKeyDown={keyPress}
              size="small"
            />
          )}
        />
      </Box>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "154px" }}>
            {showSelect && (
              <>
                <ConstraintSelect constraint={""} />
                <VersionSelect version={""} />
              </>
            )}
          </Box>
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
