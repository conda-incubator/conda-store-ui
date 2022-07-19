import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import { PackageManagerSearch } from "./PackageManagerSearch";
import EnvironmentsList from "./EnvironmentsList";
import { Environment } from "src/common/models";
import { useDebounce } from "use-debounce";

interface IPackageManagerProps {
  list: Environment[];
}

export const PackageManager = ({ list }: IPackageManagerProps) => {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const {
    palette: { primary }
  } = useTheme();

  const filteredList = useMemo(
    () => list.filter(item => item.name.includes(value)),
    [value]
  );

  return (
    <Box sx={{ width: "313px", border: `1px solid ${primary.main}` }}>
      <Box sx={{ borderBottom: `1px solid ${primary.main}` }}>
        <PackageManagerSearch
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Box>
      <EnvironmentsList environmentsList={filteredList} />
    </Box>
  );
};
