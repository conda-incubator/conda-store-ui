import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import EnvironmentsList from "./EnvironmentsList";
import { debounce } from "lodash";
import { EnvironmentsSearch } from "./EnvironmentsSearch";
import { useLazyFetchEnvironmentsQuery } from "../environmentsApiSlice";
import { Environment } from "src/common/models";

export const Environments = () => {
  const size = 100;
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Environment[] | undefined>(undefined);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  const {
    palette: { primary }
  } = useTheme();

  const [triggerQuery] = useLazyFetchEnvironmentsQuery();

  const handleChange = debounce(async (value: string) => {
    const { data } = await triggerQuery({ page: 1, size, search: value });
    if (data) {
      setData(data.data);
      setCount(data.count);
    }
    setPage(1);
    setSearch(value);
  }, 500);

  const next = async () => {
    const { data } = await triggerQuery({ page: page + 1, size, search });
    if (data) {
      setData(currData => currData?.concat(data.data));
      setCount(data.count);
    }
    setPage(currPage => currPage + 1);
  };

  useEffect(() => {
    (async () => {
      const { data } = await triggerQuery({ page, size, search });
      setData(data?.data);
      if (data?.count) {
        setCount(data.count);
      }
    })();
  }, []);

  return (
    <Box sx={{ width: "313px", border: `1px solid ${primary.main}` }}>
      <Box sx={{ borderBottom: `1px solid ${primary.main}` }}>
        <EnvironmentsSearch onChange={e => handleChange(e.target.value)} />
      </Box>
      <Box sx={{ height: "550px" }}>
        {data && (
          <EnvironmentsList
            next={next}
            hasMore={size * page < count}
            environmentsList={data}
          />
        )}
      </Box>
    </Box>
  );
};
