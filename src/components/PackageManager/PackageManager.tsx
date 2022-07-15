import React from "react";
import { PackageManagerSearch } from "./PackageManagerSearch";
import { EnvironmentDropdown } from "./EnvironmentDropdown";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import { Environment } from "src/common/models";
import useTheme from "@mui/material/styles/useTheme";

interface IPackageManagerProps {
  list: Environment[];
}

export const PackageManager = ({ list }: IPackageManagerProps) => {
  const {
    palette: { primary }
  } = useTheme();
  const namespaces: any = {};

  list.forEach(environment => {
    if (namespaces[environment.namespace.name] === undefined) {
      namespaces[environment.namespace.name] = environment.namespace;
    }
  });

  return (
    <Box sx={{ width: "313px", border: `1px solid ${primary.main}` }}>
      <Box sx={{ borderBottom: `1px solid ${primary.main}` }}>
        <PackageManagerSearch />
      </Box>
      <Box
        sx={{
          height: "300px",
          maxHeight: "450px",
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
        <Box sx={{ borderBottom: `1px solid ${primary.main}` }}>
          {Object.keys(namespaces).map(namespace => {
            const namespaceObj = namespaces[namespace];

            if (namespaceObj.name === "default") {
              return (
                <EnvironmentDropdown
                  list={list}
                  namespace={namespaceObj}
                  key={namespaceObj.id}
                />
              );
            }

            return null;
          })}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
            marginTop: "24px"
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
        {Object.keys(namespaces).map(namespace => {
          const namespaceObj = namespaces[namespace];

          if (namespaceObj.name !== "default") {
            return (
              <EnvironmentDropdown
                list={list}
                namespace={namespaceObj}
                key={namespaceObj.id}
              />
            );
          }

          return null;
        })}
      </Box>
    </Box>
  );
};
