import React from "react";

import SquareIcon from "@mui/icons-material/Square";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const RequestedPackage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
        <SquareIcon
          sx={{ color: "#000", width: 10, height: 10, marginRight: "12px" }}
        />
        <Typography>Pandas 3.8</Typography>
      </Box>
      <Typography>Constraint Example 1</Typography>
    </Box>
  );
};

export default RequestedPackage;
