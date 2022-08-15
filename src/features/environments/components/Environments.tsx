import React, { useState } from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import EnvironmentsList from "./EnvironmentsList";
import { debounce } from "lodash";
import { EnvironmentsSearch } from "./EnvironmentsSearch";
import { useFetchEnvironmentsQuery } from "../environmentsApiSlice";

export const Environments = () => {
  const [search, setSearch] = useState("");
  const {
    palette: { primary }
  } = useTheme();

  const { data } = useFetchEnvironmentsQuery({
    page: 1,
    size: 100,
    search
  });

  const handleChange = debounce((value: string) => {
    setSearch(value);
  }, 500);

  return (
    <Box sx={{ width: "313px", border: `1px solid ${primary.main}` }}>
      <Box sx={{ borderBottom: `1px solid ${primary.main}` }}>
        <EnvironmentsSearch onChange={e => handleChange(e.target.value)} />
      </Box>
      <Box sx={{ height: "550px" }}>
        {data && <EnvironmentsList environmentsList={data.data} />}
      </Box>
    </Box>
  );
};
