import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import { PackageManagerSearch } from "./PackageManagerSearch";
import EnvironmentsList from "./EnvironmentsList";
import { Environment } from "src/common/models";
import { debounce } from "lodash";

interface IPackageManagerProps {
  list: Environment[];
}

export const PackageManager = ({ list }: IPackageManagerProps) => {
  const [search, setSearch] = useState("");
  const {
    palette: { primary }
  } = useTheme();

  const handleChange = debounce((value: string) => {
    setSearch(value);
  }, 500);

  const filteredList = useMemo(
    () => list.filter(item => item.name.includes(search)),
    [search]
  );

  return (
    <Box sx={{ width: "313px", border: `1px solid ${primary.main}` }}>
      <Box sx={{ borderBottom: `1px solid ${primary.main}` }}>
        <PackageManagerSearch onChange={e => handleChange(e.target.value)} />
      </Box>
      <EnvironmentsList environmentsList={filteredList} />
    </Box>
  );
};
