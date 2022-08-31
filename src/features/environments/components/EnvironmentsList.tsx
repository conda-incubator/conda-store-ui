import React, { useEffect, useMemo, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import GroupIcon from "@mui/icons-material/Group";
import { EnvironmentDropdown } from "./EnvironmentDropdown";
import { Environment } from "src/common/models";
import { StyledScrollContainer } from "src/styles";
import { INamespaceEnvironments } from "src/common/interfaces";
import lodash from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

interface IEnvironmentsListProps {
  /**
   * @param environmentsList environments list
   * @param hasMore indicates whether there are more items to fetch
   * @param next function that will run on the bottom of the inf scroll
   * @param search current search
   */
  environmentsList: Environment[];
  hasMore: boolean;
  next: () => void;
  search: string;
}

export const EnvironmentsList = ({
  environmentsList,
  hasMore,
  next,
  search
}: IEnvironmentsListProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { defaultNamespace, sharedNamespaces } = useMemo(() => {
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

    return { defaultNamespace, sharedNamespaces };
  }, [environmentsList]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [search]);

  return (
    <StyledScrollContainer
      sx={{
        height: "100%"
      }}
      id="environmentsScroll"
      ref={scrollRef}
    >
      <InfiniteScroll
        scrollableTarget="environmentsScroll"
        style={{ overflow: "hidden" }}
        dataLength={environmentsList.length}
        hasMore={hasMore}
        next={next}
        loader={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px"
            }}
          >
            <CircularProgress />
          </Box>
        }
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
      </InfiniteScroll>
    </StyledScrollContainer>
  );
};
