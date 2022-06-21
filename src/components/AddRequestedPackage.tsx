import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import StyledRequestedPackagesTableCell from "src/styles/StyledRequestedPackagesTableCell";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const AddRequestedPackage = () => {
  const [name, setName] = useState<string | null>(null);
  const [version, setVersion] = useState("-");
  const [constraint, setConstraint] = useState("");

  const setFields = () => {
    console.log("ran");

    if (name) {
      setVersion("latest");
      setConstraint("==");
    } else {
      setVersion("-");
      setConstraint("");
    }
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
        {constraint} {version}
      </StyledRequestedPackagesTableCell>
    </TableRow>
  );
};

export default AddRequestedPackage;
