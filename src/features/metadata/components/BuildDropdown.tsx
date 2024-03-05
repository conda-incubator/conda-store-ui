import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useTheme from "@mui/material/styles/useTheme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import { useAppDispatch } from "../../../hooks";
import { currentBuildIdChanged } from "..";
import { Build } from "../../../common/models";
import { buildDatetimeStatus } from "../../../utils/helpers/buildMapper";

interface IBuildProps {
  /**
   * @param builds list of builds
   * @param currentBuildId id of the current build
   * @param selectedBuildId id of the build selected from the dropdown
   */
  builds: Build[];
  currentBuildId: number;
  selectedBuildId: number;
}

export const BuildDropdown = ({ builds, selectedBuildId }: IBuildProps) => {
  const dispatch = useAppDispatch();
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);

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
      sx={{
        borderRadius: "0px",
        marginBottom: "10px",
        backgroundColor: open ? palette.primary[50] : "initial"
      }}
      MenuProps={{
        PaperProps: {
          style: {
            backgroundColor: palette.primary[50],
            padding: "0px",
            boxShadow: "none",
            borderRadius: "0px",
            border: `1px solid  ${palette.secondary.light}`
          }
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
          background: palette.common.white
        }
      }}
    >
      <MenuItem key="empty" value="" sx={{ display: "none" }}>
        {" "}
      </MenuItem>
      {builds
        ? builds.map(build => (
            <MenuItem key={build.id} value={build.id}>
              {buildDatetimeStatus(build, currentBuildId)}
            </MenuItem>
          ))
        : null}
    </Select>
  );
};
