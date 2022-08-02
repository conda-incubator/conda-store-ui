import React from "react";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  StyledAccordionExpandIcon,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledAccordionTitle
} from "src/styles";
import { Dependency } from "src/common/models";
import { DependenciesItem } from "./DependenciesItem";

export interface IDependenciesProps {
  dependencies: Dependency[];
  mode: "read-only" | "edit";
  hasMore: boolean;
  next?: () => void;
}

export const Dependencies = ({
  mode,
  dependencies,
  hasMore,
  next = () => {}
}: IDependenciesProps) => {
  const listLength = dependencies.length;

  return (
    <Accordion
      sx={{
        maxWidth: mode === "read-only" ? "490px" : "576px",
        boxShadow: "none"
      }}
      disableGutters
    >
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>
          Packages Installed as Dependencies
        </StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails
        id="infScroll"
        sx={{ padding: "15px 40px", maxHeight: "100px" }}
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
          {dependencies.map((dependency, index) => (
            <Box
              key={dependency.id}
              sx={{ marginBottom: index === listLength - 1 ? "0px" : "20px" }}
            >
              <DependenciesItem
                mode={mode}
                dependency={dependency}
                onClick={() => {}}
              />
            </Box>
          ))}
        </InfiniteScroll>
      </StyledAccordionDetails>
    </Accordion>
  );
};
