import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { CodeIcon } from "../components";

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
            sx={{ fontSize: "14px", fontWeight: 600, color: "#333" }}
          >
            {title}
          </Typography>
          <Grid
            component="label"
            container
            spacing={1}
            justifyContent={"center"}
            sx={{ width: "auto" }}
          >
            <Grid item sx={{ alignSelf: "baseline" }}>
              <Typography
                data-testid="block-container-title"
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  fontWeight: isEditMode ? "400" : "600"
                }}
              >
                GUI
              </Typography>
            </Grid>
            <Grid item sx={{ alignSelf: "baseline" }}>
              <Switch
                checked={isEditMode}
                onClick={e => onToggleEditMode(!isEditMode)}
                icon={<CodeIcon />}
                checkedIcon={<CodeIcon />}
                sx={{ background: "green" }}
              />
            </Grid>
            <Grid item sx={{ alignSelf: "baseline" }}>
              <Typography
                data-testid="block-container-title"
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  fontWeight: isEditMode ? "600" : "400"
                }}
              >
                YAML
              </Typography>
            </Grid>
          </Grid>
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
