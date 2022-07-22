import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import { EnvironmentDropdown } from "./EnvironmentDropdown";
import { Environment } from "src/common/models";
import { StyledScrollContainer } from "src/styles";
import { INamespaceEnvironments } from "src/common/interfaces";
import lodash from "lodash";

interface IEnvironmentsListProps {
  /**
   * @param environmentsList environments list
   */
  environmentsList: Environment[];
}

const EnvironmentsList = ({ environmentsList }: IEnvironmentsListProps) => {
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
    <StyledScrollContainer
      sx={{
        height: "300px",
        maxHeight: "862px"
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
    </StyledScrollContainer>
  );
};

export default EnvironmentsList;
