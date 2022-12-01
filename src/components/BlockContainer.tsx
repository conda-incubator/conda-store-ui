import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface IBlockContainerProps {
  title: string;
  children: React.ReactNode;
}

export const BlockContainer = ({ title, children }: IBlockContainerProps) => {
  return (
    <Box sx={{ border: "1px solid #E0E0E0", paddingBottom: "15px" }}>
      <Box sx={{ padding: "10px 15px", borderBottom: "1px solid #E0E0E0" }}>
        <Typography
          data-testid="block-container-title"
          sx={{ fontSize: "14px", fontWeight: 700, color: "#454545" }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "15px 15px 0 15px"
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
