import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo, useRef } from "react";
import useTheme from "@mui/material/styles/useTheme";
import InfiniteScroll from "react-infinite-scroll-component";
import { INamespaceEnvironments } from "../../../common/interfaces";
import { Environment, Namespace } from "../../../common/models";
import { StyledScrollContainer } from "../../../styles";
import {
  getMyPrimaryNamespace,
  getSharedNamespaces,
  namespaceMapper
} from "../../../utils/helpers/namespaces";
import { GroupIconAlt } from "../../../components";
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
  const { palette } = useTheme();

  const { primaryNamespace, sharedNamespaces } = useMemo(() => {
    // Group existing environments by namespace...
    const envsGroupedByNamespace = namespaceMapper(
      environmentsList,
      namespacesList
    );

    const primaryNamespace = getMyPrimaryNamespace(envsGroupedByNamespace);
    const sharedNamespaces = getSharedNamespaces(envsGroupedByNamespace);

    return { primaryNamespace, sharedNamespaces };
  }, [environmentsList, namespacesList]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [search]);

  return (
    <StyledScrollContainer id="environmentsScroll" ref={scrollRef}>
      <InfiniteScroll
        scrollableTarget="environmentsScroll"
        style={{ overflow: "hidden", paddingBottom: "25px" }}
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
          <Box
            sx={{
              minHeight: "50px",
              margin: "-5px 0 5px 0px"
            }}
          >
            <EnvironmentDropdown data={primaryNamespace} />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "0 0 5px 12px",
            paddingTop: "20px"
          }}
        >
          <GroupIconAlt style={{ marginRight: "10px", width: "27" }} />
          <Typography
            sx={{
              fontWeight: 600,
              marginRight: "10px",
              fontSize: "15px",
              color: palette.grey[700]
            }}
          >
            Shared Environments
          </Typography>
        </Box>
        {sharedNamespaces &&
          sharedNamespaces.map((namespace: INamespaceEnvironments) => (
            <EnvironmentDropdown key={namespace.namespace} data={namespace} />
          ))}
      </InfiniteScroll>
    </StyledScrollContainer>
  );
};
