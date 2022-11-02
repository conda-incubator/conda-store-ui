import React, { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useTheme from "@mui/material/styles/useTheme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import { useAppDispatch } from "../../../hooks";
import { currentBuildIdChanged } from "..";
import { useAppSelector } from "../../../hooks";
import { getStylesForStyleType } from "../../../utils/helpers";
import { Typography } from "@mui/material";

interface IBuildProps {
  /**
   * @param builds list of builds
   * @param currentBuildId id of the current build
   * @param onChangeStatus update the build status
   */
  builds: {
    id: number;
    name: string;
    status: string;
  }[];
  currentBuildId: number;
  currentBuildStatus: string;
}

export const Build = ({
  builds,
  currentBuildId,
  currentBuildStatus
}: IBuildProps) => {
  const dispatch = useAppDispatch();
  const { currentBuild } = useAppSelector(state => state.enviroments);
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(currentBuildStatus);

  const selectStyles = getStylesForStyleType(
    {
      marginLeft: "13px"
    },
    {
      marginLeft: "13px",
      borderRadius: "0px",
      backgroundColor: open ? "#A8DAB5" : "initial"
    }
  );

  const paperProps = getStylesForStyleType(
    {},
    {
      backgroundColor: "#A8DAB5",
      padding: "0px",
      boxShadow: "none",
      borderRadius: "0px",
      marginLeft: "12px",
      border: "1px solid #BCBFC4"
    }
  ) as React.CSSProperties;

  const menuListProps = getStylesForStyleType(
    {},
    { padding: "0px" }
  ) as React.CSSProperties;

  // If the user is watching his current build, update build's info
  useEffect(() => {
    if (["Queued", "Building"].includes(status)) {
      const build = builds.find(build => build.id === currentBuild.id);
      if (build) {
        setStatus(build.status);
      }
    }
  }, [builds]);

  const handleChange = (e: SelectChangeEvent<any>) => {
    const newCurrentBuild = builds.find(
      build => build.id === Number(e.target.value)
    );

    if (newCurrentBuild) {
      dispatch(currentBuildIdChanged(newCurrentBuild.id));
      setStatus(newCurrentBuild.status);
    }
  };

  return (
    <>
      <Select
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        sx={selectStyles}
        MenuProps={{
          PaperProps: {
            style: paperProps
          },
          MenuListProps: { style: menuListProps }
        }}
        defaultValue={currentBuildId}
        onChange={handleChange}
        IconComponent={() => (
          <IconButton
            sx={{ padding: "0px" }}
            onClick={() => setOpen(currState => !currState)}
          >
            <ArrowDropDownIcon
              sx={{
                height: "37px",
                borderLeft: `1px solid  ${palette.primary.main}`
              }}
            />
          </IconButton>
        )}
        inputProps={{
          "data-testid": "test-select",
          sx: {
            padding: "7px 9px !important",
            fontSize: "14px"
          }
        }}
      >
        {builds
          ? builds.map(build => (
              <MenuItem key={build.id} value={build.id}>
                {build.name}
              </MenuItem>
            ))
          : null}
      </Select>
      <StyledMetadataItem
        sx={{ marginTop: "10px", fontSize: "14px", fontWeight: 500 }}
      >
        Status:{" "}
        <Typography component="span" sx={{ fontSize: "14px" }}>
          {status}
        </Typography>
      </StyledMetadataItem>
    </>
  );
};
