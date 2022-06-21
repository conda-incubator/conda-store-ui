import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import StyledRequestedPackagesTableCell from "src/styles/StyledRequestedPackagesTableCell";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";

const AddRequestedPackage = () => {
  const [name, setName] = useState<string | null>(null);
  const [version, setVersion] = useState("-");
  const [constraint, setConstraint] = useState("");

  const setFields = () => {
    if (name) {
      setVersion("3.2");
      setConstraint("== latest");
      return;
    }

    setVersion("-");
    setConstraint("");
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
              {...params}
              label="Enter package name"
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setFields()}
            />
          )}
        />
      </StyledRequestedPackagesTableCell>
      <StyledRequestedPackagesTableCell>
        <Typography
          component="p"
          sx={{ fontSize: "16px", fontWeight: 400, color: "#676666" }}
        >
          {version}
        </Typography>
      </StyledRequestedPackagesTableCell>
      <StyledRequestedPackagesTableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 400,
              color: "#000",
              width: "100px",
            }}
          >
            {constraint}
          </Typography>
          <DeleteIcon />
        </Box>
      </StyledRequestedPackagesTableCell>
    </TableRow>
  );
};

export default AddRequestedPackage;
