import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import EnvironmentsList from "./EnvironmentsList";
import { Environment } from "src/common/models";
import { debounce } from "lodash";
import { EnvironmentsSearch } from "./EnvironmentsSearch";

interface IEnvironmentsProps {
  /**
   * @param list environments list
   */
  list: Environment[];
}

export const Environments = ({ list }: IEnvironmentsProps) => {
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
        <EnvironmentsSearch onChange={e => handleChange(e.target.value)} />
      </Box>
      <EnvironmentsList environmentsList={filteredList} />
    </Box>
  );
};
