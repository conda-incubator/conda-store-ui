import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

interface IBlockContainerProps {
  title: string;
  children: React.ReactNode;
  onToggleEditMode: (show: boolean) => void;
  isEditMode: boolean;
}

export const BlockContainerEditMode = ({
  title,
  children,
  onToggleEditMode,
  isEditMode
}: IBlockContainerProps) => {
  return (
    <Box
      sx={{
        border: "1px solid #E0E0E0",
        paddingBottom: "15px"
      }}
    >
      <Box
        sx={{
          padding: "10px 15px",
          borderBottom: "1px solid #E0E0E0"
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography
            data-testid="block-container-title"
            sx={{ fontSize: "14px", fontWeight: 700, color: "#3C4043" }}
          >
            {title}
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isEditMode}
                onClick={e => onToggleEditMode(!isEditMode)}
              />
            }
            label={
              <Typography sx={{ fontSize: "13px", color: "#3C4043" }}>
                {isEditMode
                  ? "Switch to Standard View"
                  : "Switch to YAML Editor"}
              </Typography>
            }
          />
        </Box>
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
