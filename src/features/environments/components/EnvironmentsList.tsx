import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { INamespaceEnvironments } from "../../../common/interfaces";
import { Environment, Namespace } from "../../../common/models";
import { GroupIconAlt } from "../../../components";
import { StyledScrollContainer } from "../../../styles";
import {
  getMyPrimaryNamespace,
  groupEnvsByNamespace,
  getSharedNamespaces
} from "../../../utils/helpers/namespaces";
import { EnvironmentDropdown } from "./EnvironmentDropdown";

interface IEnvironmentsListProps {
  /**
   * @param environmentsList environments list
   * @param namespacesList namespaces list
   * @param hasMore indicates whether there are more items to fetch
   * @param next function that will run on the bottom of the inf scroll
   * @param search current search
   */
  environmentsList: Environment[];
  namespacesList: Namespace[];
  hasMore: boolean;
  next: () => void;
  search: string;
}

export const EnvironmentsList = ({
  environmentsList,
  namespacesList,
  hasMore,
  next,
  search
}: IEnvironmentsListProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { primaryNamespace, sharedNamespaces } = useMemo(() => {
    const myPrimaryNamespace = namespacesList.find(
      namespace => namespace.isPrimary
    );

    // Group existing environments by namespace...
    const envsGroupedByNamespace = groupEnvsByNamespace(
      environmentsList,
      myPrimaryNamespace
    );
    const primaryNamespace = getMyPrimaryNamespace(envsGroupedByNamespace);
    const sharedNamespaces = getSharedNamespaces(envsGroupedByNamespace);

    return { primaryNamespace, sharedNamespaces };
  }, [environmentsList, namespacesList]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [search]);

  return (
    <StyledScrollContainer
      sx={{ minHeight: "229px", maxHeight: "725px" }}
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
        {primaryNamespace && (
          <Box sx={{ minHeight: "50px", margin: "-5px 0 5px 0px" }}>
            <EnvironmentDropdown data={primaryNamespace} />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "0 0 5px 12px"
          }}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: 600,
              marginRight: "10px",
              fontSize: "13px",
              color: " #333"
            }}
          >
            Shared environments
          </Typography>
          <GroupIconAlt style={{ marginLeft: "10px", scale: ".8" }} />
        </Box>
        {sharedNamespaces &&
          sharedNamespaces.map((namespace: INamespaceEnvironments) => (
            <EnvironmentDropdown key={namespace.namespace} data={namespace} />
          ))}
      </InfiniteScroll>
    </StyledScrollContainer>
  );
};
