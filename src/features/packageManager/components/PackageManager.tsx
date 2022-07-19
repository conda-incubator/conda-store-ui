import React, { useMemo, useState } from "react";
import { PackageManagerSearch } from "./PackageManagerSearch";
import { EnvironmentDropdown } from "./EnvironmentDropdown";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import { Environment } from "src/common/models";
import useTheme from "@mui/material/styles/useTheme";
import { useDebounce } from "use-debounce";
import lodash from "lodash";
import { INamespaceEnvironments } from "src/common/interfaces";

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

  let defaultNamespace: INamespaceEnvironments | null = null;
  const sharedNamespaces: INamespaceEnvironments[] = [];

  lodash(filteredList)
    .groupBy((x: Environment) => x.namespace.name)
    .map((value: Environment[], key: string) => {
      const obj = { namespace: key, environments: value };

      if (obj.namespace === "default") {
        defaultNamespace = obj;
        return;
      }

      sharedNamespaces.push(obj);
    })
    .value();

  return (
    <Box sx={{ width: "313px", border: `1px solid ${primary.main}` }}>
      <Box sx={{ borderBottom: `1px solid ${primary.main}` }}>
        <PackageManagerSearch
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          height: "300px",
          maxHeight: "862px",
          overflowY: "scroll",
          overflowX: "hidden",
          paddingRight: "0px",
          "&::-webkit-scrollbar": {
            width: "15px"
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `${primary.main}`,
            borderRadius: "10px",
            border: "1px solid #666666"
          }
        }}
      >
        <Box sx={{ minHeight: "50px" }}>
          {defaultNamespace && <EnvironmentDropdown data={defaultNamespace} />}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
            marginTop: "5px"
          }}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: 500,
              marginRight: "10px"
            }}
          >
            Shared environments
          </Typography>
          <GroupIcon />
        </Box>
        {sharedNamespaces.map(namespace => (
          <EnvironmentDropdown key={namespace.namespace} data={namespace} />
        ))}
      </Box>
    </Box>
  );
};
