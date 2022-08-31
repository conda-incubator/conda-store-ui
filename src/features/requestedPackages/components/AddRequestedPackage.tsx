import React, { useEffect, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { BuildPackage } from "src/common/models";
import { StyledIconButton } from "src/styles";
import { useLazyGetPackageSuggestionsQuery } from "../requestedPackagesApiSlice";
import { debounce } from "lodash";

interface IAddRequestedPackageProps {
  /**
   * @param onCancel handler that will run when delete icon is clicked
   * @param onSubmit handler that will run when input losses focus
   */
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (packageName: string) => void;
}

export const AddRequestedPackage = ({
  onCancel,
  onSubmit
}: IAddRequestedPackageProps) => {
  const size = 100;
  const [name, setName] = useState<string>("");
  const [data, setData] = useState<BuildPackage[]>([]);
  const [page, setPage] = useState(1);
  const [triggerQuery] = useLazyGetPackageSuggestionsQuery();

  const uniqueList = useMemo(() => {
    const packageNames = new Set();
    const result: string[] = [];

    data.forEach(buildPackage => {
      const packageName = buildPackage.name;
      const hasPackageName = packageNames.has(packageName);

      if (!hasPackageName) {
        result.push(packageName);
        packageNames.add(packageName);
      }
    });

    return result;
  }, [data]);

  const handleSubmit = () => {
    if (name) {
      onSubmit(name);
      onCancel(false);
    }
  };

  const handleSearch = debounce(async (value: string) => {
    setName(value);
    setPage(1);

    const { data } = await triggerQuery({ page, size, search: value });

    if (data) {
      setData(data.data);
    }
  }, 200);

  const handleScroll = (event: React.SyntheticEvent) => {
    const listboxNode = event.currentTarget;
    if (
      listboxNode.scrollTop + listboxNode.clientHeight ===
      listboxNode.scrollHeight
    ) {
      return true;
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await triggerQuery({ page, search: "", size });
      if (data) {
        setData(data.data);
      }
    })();
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
      <Box sx={{ marginRight: "160px" }}>
        <Autocomplete
          onInputChange={(event, value, reason) => {
            if (reason === "clear") {
              setName("");
              setPage(1);
              return;
            }

            handleSearch(value);
          }}
          freeSolo
          options={uniqueList}
          sx={{ width: "140px" }}
          ListboxProps={{
            onScroll: handleScroll
          }}
          renderInput={params => (
            <TextField
              autoFocus
              {...params}
              label="Enter package"
              onBlur={handleSubmit}
              size="small"
            />
          )}
        />
      </Box>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "154px" }} />
          <StyledIconButton
            onClick={() => onCancel(false)}
            sx={{ marginLeft: "24px" }}
          >
            <DeleteIcon />
          </StyledIconButton>
        </Box>
      </Box>
    </Box>
  );
};
