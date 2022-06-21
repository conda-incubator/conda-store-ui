import React from "react";

import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import RequestedPackage from "./RequestedPackage";
import Box from "@mui/material/Box";
import StyledAccordionSummary from "src/styles/StyledAccordionSummary";
import StyledAccordionDetails from "src/styles/StyledAccordionDetails";
import useTheme from "@mui/material/styles/useTheme";

interface IRequestedPackageListProps {
  packageList: (string | object)[];
  listHeight: number;
}

const RequestedPackageList = ({
  packageList,
  listHeight,
}: IRequestedPackageListProps) => {
  const { palette } = useTheme();

  const filteredPackageList = packageList.filter(
    (item) => typeof item !== "object"
  );
  const listLength = filteredPackageList.length;

  return (
    <Accordion sx={{ width: 421, boxShadow: "none" }}>
      <StyledAccordionSummary
        expandIcon={
          <ArrowRightRoundedIcon
            sx={{ width: 51, height: 55, color: palette.secondary.main }}
          />
        }
      >
        <Typography
          variant="h5"
          component="h5"
          sx={{ fontSize: "18px", fontWeight: 500 }}
        >
          Requested Packages
        </Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails sx={{ maxHeight: `${listHeight}px` }}>
        {filteredPackageList.map((item, index) => (
          <Box
            key={`${item}`}
            sx={{ marginBottom: index === listLength - 1 ? "0px" : "15px" }}
          >
            <RequestedPackage requestedPackage={`${item}`} />
          </Box>
        ))}
      </StyledAccordionDetails>
    </Accordion>
  );
};

export default RequestedPackageList;
