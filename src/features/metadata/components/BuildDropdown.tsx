import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useTheme from "@mui/material/styles/useTheme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import { useAppDispatch } from "../../../hooks";
import { currentBuildIdChanged } from "..";

interface IBuildProps {
  /**
   * @param builds list of builds
   * @param currentBuildName name of the current build
   * @param onChangeStatus update the build status
   */
  builds: {
    id: number;
    name: string;
    status: string;
  }[];
  currentBuildName: string;
  currentBuildStatus: string;
}

export const Build = ({
  builds,
  currentBuildName,
  currentBuildStatus
}: IBuildProps) => {
  const dispatch = useAppDispatch();
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(currentBuildStatus);

  const handleChange = (e: SelectChangeEvent<string>) => {
    const newCurrentBuild = builds.find(build => build.name === e.target.value);

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
        sx={{ marginLeft: "13px" }}
        defaultValue={currentBuildName ? currentBuildName : ""}
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
            padding: "7px 9px !important"
          }
        }}
      >
        {builds
          ? builds.map(build => (
              <MenuItem key={build.id} value={build.name}>
                {build.name}
              </MenuItem>
            ))
          : null}
      </Select>
      <StyledMetadataItem>
        <b>Status:</b> {status}
      </StyledMetadataItem>
    </>
  );
};
