import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import StyledRequestedPackagesTableCell from "src/styles/StyledRequestedPackagesTableCell";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
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

  return (
    <TableRow>
      <StyledRequestedPackagesTableCell>
        <Autocomplete
          freeSolo
          options={["python", "pandas"]}
          onChange={(e, value) => {
            setName(value);
          }}
          renderInput={(params) => (
            <TextField
              autoFocus
              {...params}
              label="Enter package name"
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setFields()}
              size="small"
            />
          )}
        />
      </StyledRequestedPackagesTableCell>
      <StyledRequestedPackagesTableCell>
        <Typography
          component="p"
          sx={{ fontSize: "16px", fontWeight: 400, color: "#676666" }}
        >
          -
        </Typography>
      </StyledRequestedPackagesTableCell>
      <StyledRequestedPackagesTableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "154px" }}>
            {showSelect && (
              <>
                <ConstraintSelect constraint={null} />
                <VersionSelect version={null} />
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
      </StyledRequestedPackagesTableCell>
    </TableRow>
  );
};

export default AddRequestedPackage;
