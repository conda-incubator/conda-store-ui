import React, { memo, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import EnvironmentsList from "./EnvironmentsList";
import { Environment } from "src/common/models";
import { debounce } from "lodash";
import { EnvironmentsSearch } from "./EnvironmentsSearch";

export interface IEnvironmentsProps {
  /**
   * @param list environments list
   */
  list: Environment[];
}

const BaseEnvironments = ({ list }: IEnvironmentsProps) => {
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

// memoize the component, rerender only when the arrays from props are different
// use JSON.stringify to turn arrays into string for === check to work propertly
const compareProps = (
  prevProps: IEnvironmentsProps,
  nextProps: IEnvironmentsProps
) => {
  return JSON.stringify(prevProps.list) === JSON.stringify(nextProps.list);
};

export const Environments = memo(BaseEnvironments, compareProps);
