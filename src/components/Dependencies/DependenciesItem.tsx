import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SquareIcon from "@mui/icons-material/Square";
import { Dependency } from "src/common/models";

interface IDependenciesItemProps {
  dependency: Dependency;
}

const DependenciesItem = ({ dependency }: IDependenciesItemProps) => {
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
        <Typography sx={{ color: "#000" }}>{dependency.name}</Typography>
      </Box>
      <Typography sx={{ color: "#000" }}>{dependency.version}</Typography>
    </Box>
  );
};

export default DependenciesItem;
