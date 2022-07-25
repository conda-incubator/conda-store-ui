import React, { useState } from "react";
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
}

export const Dependencies = ({ dependencies, mode }: IDependenciesProps) => {
  const [list, setList] = useState(dependencies);
  const listLength = list.length;

  const nextDependencies = [
    {
      id: Math.random(),
      channel: {
        id: 2,
        name: "https://conda.anaconda.org/conda-forge",
        last_update: null
      },
      build: "pyhd8ed1ab_0",
      license: "Apache-2.0",
      sha256:
        "4da0fe03babc950532513e9165dbc337a663880352392f496992776608dd77ca",
      name: "asttokens",
      version: "2.0.5",
      summary:
        "The asttokens module annotates Python abstract syntax trees (ASTs) with the positions of tokens and text in the source code that generated them."
    },
    {
      id: Math.random(),
      channel: {
        id: 2,
        name: "https://conda.anaconda.org/conda-forge",
        last_update: null
      },
      build: "pyh9f0ad1d_0",
      license: "BSD-3-Clause",
      sha256:
        "ee62d6434090c1327a48551734e06bd10e65a64ef7f3b6e68719500dab0e42b9",
      name: "backcall",
      version: "0.2.0",
      summary: "Specifications for callback functions passed in to an API"
    },
    {
      id: Math.random(),
      channel: {
        id: 2,
        name: "https://conda.anaconda.org/conda-forge",
        last_update: null
      },
      build: "pyh9f0ad1d_0",
      license: "BSD-3-Clause",
      sha256:
        "ee62d6434090c1327a48551734e06bd10e65a64ef7f3b6e68719500dab0e42b9",
      name: "backports.functools_lru_cache",
      version: "0.2.0",
      summary: "Specifications for callback functions passed in to an API"
    }
  ];

  const addDependencies = () => {
    if (list.length <= 15) {
      setTimeout(() => {
        setList(list.concat(nextDependencies));
      }, 1000);
    }
  };

  const handlePromote = (id: number) => {
    const filteredList = list.filter(item => item.id !== id);

    setList(filteredList);
  };

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
          hasMore={listLength <= 15}
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
          next={addDependencies}
          scrollableTarget="infScroll"
          style={{ overflow: "hidden" }}
        >
          {list.map((dependency, index) => (
            <Box
              key={dependency.id}
              sx={{ marginBottom: index === listLength - 1 ? "0px" : "20px" }}
            >
              <DependenciesItem
                mode={mode}
                dependency={dependency}
                onClick={handlePromote}
              />
            </Box>
          ))}
        </InfiniteScroll>
      </StyledAccordionDetails>
    </Accordion>
  );
};
