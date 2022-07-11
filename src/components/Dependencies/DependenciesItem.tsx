import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SquareIcon from "@mui/icons-material/Square";

const DependenciesItem = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", width: "300px" }}>
        <SquareIcon
          sx={{
            color: "#000",
            width: 10,
            height: 10,
            marginRight: "12px"
          }}
        />
        <Typography sx={{ color: "#000" }}>
          backports.functools_lru_cache
        </Typography>
      </Box>
      <Typography sx={{ color: "#000" }}>1.6</Typography>
    </Box>
  );
};

export default DependenciesItem;
