import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CodeIcon } from "../components";
import { StyledSwitch } from "../styles";
import Button from "@mui/material/Button";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

interface IBlockContainerProps {
  title: string;
  children: React.ReactNode;
  onToggleEditMode: (show: boolean) => void;
  isEditMode: boolean;
  setShowDialog: (show: boolean) => void;
}

export const BlockContainerEditMode = ({
  title,
  children,
  onToggleEditMode,
  isEditMode,
  setShowDialog
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
          <Box display="flex" alignItems="center">
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={<UploadFileRoundedIcon />}
              onClick={() => setShowDialog(true)}
              sx={{ mx: "1em" }}
            >
              Switch to Conda Lockfile Upload
            </Button>{" "}
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
                <StyledSwitch
                  checked={isEditMode}
                  onClick={e => onToggleEditMode(!isEditMode)}
                  icon={<CodeIcon />}
                  checkedIcon={<CodeIcon />}
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
