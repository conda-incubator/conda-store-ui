import Accordion from "@mui/material/Accordion";
import { RequestedPackage } from ".";
import Box from "@mui/material/Box";
import React, { useEffect, useMemo } from "react";
import {
  StyledAccordionDetails,
  StyledAccordionExpandIcon,
  StyledAccordionSummary,
  StyledAccordionTitle
} from "src/styles";
import { CondaSpecificationPip } from "src/common/models";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { packageVersionAdded } from "../requestedPackagesSlice";

export interface IRequestedPackageListProps {
  /**
   * @param packageList list of packages that we get from the API
   */
  packageList: (string | CondaSpecificationPip)[];
}

export const RequestedPackageList = ({
  packageList
}: IRequestedPackageListProps) => {
  const { dependencies } = useAppSelector(state => state.dependencies);
  const { packagesWithLatestVersions } = useAppSelector(
    state => state.requestedPackages
  );
  const dispatch = useAppDispatch();

  const filteredPackageList = useMemo(
    () => packageList.filter(item => typeof item !== "object"),
    [packageList]
  );
  const listLength = filteredPackageList.length;

  useEffect(() => {
    dependencies.forEach(dep => {
      const foundPackage = packagesWithLatestVersions[dep.name];

      if (foundPackage) {
        dispatch(
          packageVersionAdded({ packageName: dep.name, version: dep.version })
        );
      }
    });
  }, [packageList, dependencies]);

  return (
    <Accordion sx={{ width: 421, boxShadow: "none" }} disableGutters>
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>Requested Packages</StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails sx={{ padding: "11px 40px" }}>
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
