import React, { useState, useEffect, useMemo, useReducer } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useTheme from "@mui/material/styles/useTheme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import { useLazyGetPackageVersionSuggestionsQuery } from "src/features/requestedPackages/requestedPackageVersionApiSlice";
import {
  ActionTypes,
  initialState,
  requestedPackagesReducer
} from "src/features/requestedPackages/reducer";

interface IVersionSelectProps {
  /**
   * @param version package version
   * @param name package name
   */
  version: string | null;
  name: string;
}

export const VersionSelect = ({ version, name }: IVersionSelectProps) => {
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);

  const [state, dispatch] = useReducer(requestedPackagesReducer, initialState);

  const [triggerQuery] = useLazyGetPackageVersionSuggestionsQuery();

  useEffect(() => {
    (async () => {
      dispatch({ type: ActionTypes.LOADING, payload: { loading: true } });
      const { data } = await triggerQuery({
        page: state.page,
        search: name.trim()
      });

      if (data) {
        dispatch({
          type: ActionTypes.DATA_FETCHED,
          payload: { data: data.data, count: data.count }
        });
      }
      dispatch({ type: ActionTypes.LOADING, payload: { loading: false } });
    })();
  }, []);

  const versionList = useMemo(() => {
    const uniqueVersions = new Set();
    const result: string[] = [];
    state.data.forEach(packageVersions => {
      const packageVersion = packageVersions.version;
      const hasPackageVersion = uniqueVersions.has(packageVersion);

      if (!hasPackageVersion) {
        result.push(packageVersion);
        uniqueVersions.add(packageVersion);
      }
    });
    return result;
  }, [state.data]);

  return (
    <Select
      defaultValue={""}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      IconComponent={() => (
        <IconButton
          sx={{ padding: "0px" }}
          onClick={() => setOpen(currState => !currState)}
        >
          <ArrowDropDownIcon
            sx={{
              backgroundColor: "#ECECEC",
              height: "37px",
              borderLeft: `2px solid  ${palette.primary.main}`
            }}
          />
        </IconButton>
      )}
      MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
      sx={{
        borderRadius: "0px",
        width: "110px",
        border: "none"
      }}
      inputProps={{
        sx: {
          padding: "7px 9px !important",
          backgroundColor: "#ECECEC",
          borderRadius: "0px"
        }
      }}
    >
      <MenuItem value={""} sx={{ height: "35px !important" }}></MenuItem>
      {versionList.map(version => (
        <MenuItem key={version} value={version}>
          {version}
        </MenuItem>
      ))}
    </Select>
  );
};
