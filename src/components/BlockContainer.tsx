import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface IBlockContainerProps {
  title: string;
  children: React.ReactNode;
}

export const BlockContainer = ({ title, children }: IBlockContainerProps) => {
  return (
    <Box sx={{ border: "1px solid #000" }}>
      <Box sx={{ padding: "17px 19px", borderBottom: "1px solid #A7A7A7" }}>
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
