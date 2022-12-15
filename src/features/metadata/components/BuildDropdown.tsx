import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useTheme from "@mui/material/styles/useTheme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import { useAppDispatch } from "../../../hooks";
import { currentBuildIdChanged } from "..";
import { getStylesForStyleType } from "../../../utils/helpers";

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
  selectedBuildId: number;
}

export const Build = ({ builds, selectedBuildId }: IBuildProps) => {
  const dispatch = useAppDispatch();
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);

  const selectStyles = getStylesForStyleType(
    {
      borderRadius: "0px",
      marginBottom: "10px"
    },
    {
      borderRadius: "0px",
      marginBottom: "10px",
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
      border: "1px solid #BCBFC4"
    }
  ) as React.CSSProperties;

  const handleChange = (e: SelectChangeEvent<any>) => {
    const newCurrentBuild = builds.find(
      build => build.id === Number(e.target.value)
    );

    if (newCurrentBuild) {
      dispatch(currentBuildIdChanged(newCurrentBuild.id));
    }
  };

  return (
    <Select
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      sx={selectStyles}
      MenuProps={{
        PaperProps: {
          style: paperProps
        },
        MenuListProps: {
          style: {
            padding: "0px"
          }
        }
      }}
      value={selectedBuildId}
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
          fontSize: "13px",
          background: "#FFF"
        }
      }}
    >
      <MenuItem key="empty" value="" sx={{ display: "none" }}>
        {" "}
      </MenuItem>
      {builds
        ? builds.map(build => (
            <MenuItem key={build.id} value={build.id}>
              {build.name}
            </MenuItem>
          ))
        : null}
    </Select>
  );
};
