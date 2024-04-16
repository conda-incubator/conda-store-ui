import React, { useEffect, useRef } from "react";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledAccordionTitle
} from "../../../styles";
import { Dependency } from "../../../common/models";
import { DependenciesItem } from "./DependenciesItem";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { dependencyPromoted } from "../../../features/requestedPackages";
import { ArrowIcon } from "../../../components";

export interface IDependenciesProps {
  /**
   * @param dependencies list of dependencies
   * @param mode change whether the component only displays the list or we are able to edit it
   * @param hasMore needed for infinite scroll, if this is true next function will be called
   * @param next handler which will be called when we scoll at the current bottom of the infinite scroll lists
   */
  dependencies: Dependency[];
  mode: "read-only" | "edit";
  hasMore: boolean;
  next?: () => void;
}

export const Dependencies = ({
  mode,
  dependencies,
  hasMore,
  next = () => null
}: IDependenciesProps) => {
  const dispatch = useAppDispatch();
  const { selectedEnvironment } = useAppSelector(state => state.tabs);
  const listLength = dependencies.length;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [selectedEnvironment?.id]);

  return (
    <Accordion
      sx={{
        maxWidth: 420,
        boxShadow: "none"
      }}
      disableGutters
      defaultExpanded
    >
      <StyledAccordionSummary expandIcon={<ArrowIcon />}>
        <StyledAccordionTitle sx={{ color: "primary.main" }}>
          Packages Installed
        </StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails
        id="infScroll"
        sx={{ padding: 0, maxHeight: "300px" }}
        ref={scrollRef}
      >
        <InfiniteScroll
          hasMore={hasMore}
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
          dataLength={listLength}
          next={next}
          scrollableTarget="infScroll"
          style={{ overflow: "hidden" }}
        >
          {dependencies.length ? (
            <TableContainer>
              <Table sx={{ width: "420px", tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "13px" }}>Package</TableCell>
                    <TableCell sx={{ fontSize: "13px", textAlign: "right" }}>
                      Installed Version
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dependencies.map((dependency, index) => (
                    <TableRow
                      key={dependency.id}
                      sx={{
                        backgroundColor:
                          index % 2 ? "secondary[50]" : "transparent"
                      }}
                    >
                      <DependenciesItem
                        mode={mode}
                        dependency={dependency}
                        handleClick={() =>
                          dispatch(dependencyPromoted(dependency))
                        }
                        isLast={index === dependencies.length - 1}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <CircularProgress size={20} />
          )}
        </InfiniteScroll>
      </StyledAccordionDetails>
    </Accordion>
  );
};
