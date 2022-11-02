import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getStylesForStyleType } from "../utils/helpers";

interface IBlockContainerProps {
  title: string;
  children: React.ReactNode;
}

export const BlockContainer = ({ title, children }: IBlockContainerProps) => {
  const containerStyles = getStylesForStyleType(
    { border: "1px solid #000" },
    { border: "1px solid #E0E0E0" }
  );

  const boxStyles = getStylesForStyleType(
    { padding: "17px 19px", borderBottom: "1px solid #A7A7A7" },
    { padding: "17px 19px", border: "1px solid #E0E0E0" }
  );

  return (
    <Box sx={containerStyles}>
      <Box sx={boxStyles}>
        <Typography
          data-testid="block-container-title"
          sx={{ fontSize: "20px", fontWeight: 400, color: "#000" }}
        >
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};
