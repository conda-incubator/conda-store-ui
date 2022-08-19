import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

interface IBlockContainerProps {
  title: string;
  children: React.ReactNode;
  toggle: any;
  show: any;
}

export const BlockContainerEditMode = ({
  title,
  children,
  toggle,
  show
}: IBlockContainerProps) => {
  const showYaml = () => toggle(!show);

  return (
    <Box sx={{ border: "1px solid #000" }}>
      <Box sx={{ padding: "17px 19px", borderBottom: "1px solid #A7A7A7" }}>
        <Typography
          data-testid="block-container-title"
          sx={{
            fontSize: "20px",
            fontWeight: 400,
            color: "#000",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          {title}
          <FormControlLabel
            control={<Switch />}
            label={show ? "Switch to Standard View" : "Switch to YAML Editor"}
            onClick={showYaml}
          />
        </Typography>
      </Box>
      {children}
    </Box>
  );
};
