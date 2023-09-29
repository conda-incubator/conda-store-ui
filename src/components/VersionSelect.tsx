import React, { useState, useEffect, useMemo, useReducer } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useTheme from "@mui/material/styles/useTheme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import { compareVersions } from "compare-versions";
import { coerce } from "semver";
import { useLazyGetPackageVersionSuggestionsQuery } from "../features/requestedPackages/requestedPackageVersionApiSlice";
import {
  ActionTypes,
  initialState,
  requestedPackagesReducer
} from "../features/requestedPackages/reducer";
import { useAppDispatch, useAppSelector } from "../hooks";
import { buildPackagesCacheAdded } from "../features/requestedPackages";
import { getStylesForStyleType } from "../utils/helpers";

interface IVersionSelectProps {
  /**
   * @param version package version
   * @param name package name
   */
  version: string | null;
  name: string;
  onUpdate?: (value: string) => void;
}

export const VersionSelect = ({
  version,
  name,
  onUpdate = (value: string) => {}
}: IVersionSelectProps) => {
  const { palette } = useTheme();
  const reduxDispatch = useAppDispatch();
  const { buildPackagesCache } = useAppSelector(
    state => state.requestedPackages
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(version ?? "");

  const [state, dispatch] = useReducer(requestedPackagesReducer, initialState);

  const [triggerQuery] = useLazyGetPackageVersionSuggestionsQuery();

  // const inputStyles = getStylesForStyleType(
  //   {
  //     padding: "7px 9px !important",
  //     backgroundColor: "#ECECEC",
  //     borderRadius: "0px"
  //   },
  //   {
  //     padding: "7px 9px !important",
  //     backgroundColor: "#fff",
  //     borderRadius: "0px"
  //   }
  // );

  const iconStyles = getStylesForStyleType(
    {
      backgroundColor: "#ECECEC",
      height: "37px",
      borderLeft: `2px solid  ${palette.primary.main}`
    },
    {
      backgroundColor: "#fff",
      height: "37px",
      borderLeft: "1px solid #BCBFC4"
    }
  );

  useEffect(() => {
    (async () => {
      if (buildPackagesCache[name]) {
        dispatch({
          type: ActionTypes.DATA_FETCHED,
          payload: {
            data: buildPackagesCache[name].packages,
            count: buildPackagesCache[name].count
          }
        });

        return;
      }

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
        reduxDispatch(
          buildPackagesCacheAdded({
            pkgName: name,
            packages: data.data,
            count: data.count
          })
        );
      }
      dispatch({ type: ActionTypes.LOADING, payload: { loading: false } });
    })();
  }, []);

  const versionsList = useMemo(() => {
    const uniqueVersions = new Set();
    const result: string[] = [];
    let sortedVersions: string[] = [];

    state.data.forEach(packageVersions => {
      const packageVersion = packageVersions.version;
      const hasPackageVersion = uniqueVersions.has(packageVersion);

      if (!hasPackageVersion) {
        result.push(packageVersion);
        uniqueVersions.add(packageVersion);
      }
    });

    // compare-versions will throw an error if a version doesn't match the semver spec.
    // Since it's possible to encounter python packages with non-semver versions, let's be more lenient.
    // We should only use this for sorting, not determining exact matches, since some information
    // may be removed from the version number. E.g. "0.5.0.pre" is treated as "0.5.0"
    const safeCompareVersions = (v1: string, v2: string) => {
      const safeV1 = (coerce(v1) || "").toString();
      const safeV2 = (coerce(v2) || "").toString();

      // Be sure both versions are not empty before calling the compareVersions method,
      // in order to avoid the 'Invalid argument not valid semver'
      return safeV1 && safeV2 ? compareVersions(safeV1, safeV2) : 1;
    };
    sortedVersions = result.sort(safeCompareVersions);

    sortedVersions.forEach(v => {
      if (v !== "" && value !== "") {
        if (v === value) {
          setValue(v);
        }
      }
    });

    return sortedVersions.reverse();
  }, [state.data]);

  return (
    <Select
      value={versionsList.length > 0 ? value : ""}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      onChange={e => {
        onUpdate(e.target.value);
        setValue(e.target.value);
      }}
      IconComponent={() => (
        <IconButton
          sx={{ padding: "0px" }}
          onClick={() => setOpen(currState => !currState)}
        >
          <ArrowDropDownIcon sx={iconStyles} />
        </IconButton>
      )}
      MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
      notched={false}
      sx={{
        borderRadius: "0px",
        width: "110px",
        border: "none",
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: palette.secondary.main,
          transition: "none"
        },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: palette.accent.main,
            transition: "none"
          }
      }}
      inputProps={{
        sx: {
          padding: "7px 9px !important",
          backgroundColor: palette.common.white,
          borderRadius: "0px"
        },
        "data-testid": "VersionSelectTest"
      }}
    >
      <MenuItem key="empty" value="" sx={{ height: "30px" }}>
        {" "}
      </MenuItem>
      {versionsList.map(v => (
        <MenuItem key={v} value={v}>
          {v}
        </MenuItem>
      ))}
    </Select>
  );
};
