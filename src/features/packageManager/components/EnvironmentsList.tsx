import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import useTheme from "@mui/material/styles/useTheme";
import { EnvironmentDropdown } from "./EnvironmentDropdown";
import { Environment } from "src/common/models";
import { INamespaceEnvironments } from "src/common/interfaces";
import lodash from "lodash";

interface IEnvironmentsListProps {
  environmentsList: Environment[];
}

const EnvironmentsList = ({ environmentsList }: IEnvironmentsListProps) => {
  const {
    palette: { primary }
  } = useTheme();

  let defaultNamespace: INamespaceEnvironments | null = null;
  const sharedNamespaces: INamespaceEnvironments[] = [];

  lodash(environmentsList)
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
  );
};

export default EnvironmentsList;
