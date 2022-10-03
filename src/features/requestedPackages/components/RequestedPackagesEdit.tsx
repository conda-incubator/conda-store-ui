import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { RequestedPackagesTableRow } from "./RequestedPackagesTableRow";
import { AddRequestedPackage } from "./AddRequestedPackage";
import {
  StyledAccordionDetails,
  StyledAccordionExpandIcon,
  StyledAccordionSummary,
  StyledAccordionTitle,
  StyledButtonPrimary,
  StyledEditPackagesTableCell
} from "src/styles";
import { CondaSpecificationPip } from "src/common/models";
import { requestedPackageParser } from "src/utils/helpers";

export interface IRequestedPackagesEditProps {
  /**
   * @param packageList list of packages that we get from the API
   * @param updatePackages notify the parent if there are changes in packageList array.
   * @param isCreating notify the component if it's being used for creation or edition.
   */
  packageList: (string | CondaSpecificationPip)[];
  updatePackages: (packages: string[]) => void;
  isCreating: boolean;
}

export const RequestedPackagesEdit = ({
  packageList,
  updatePackages,
  isCreating
}: IRequestedPackagesEditProps) => {
  const [data, setData] = useState(packageList);
  const [isAdding, setIsAdding] = useState(false);
  const { palette } = useTheme();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const removePackage = (packageName: string) => {
    const filteredList = (currentData: string[]) =>
      currentData.filter(item => item !== packageName);

    setData(filteredList);
    const newArr = data.filter(item => item !== packageName) as string[];
    updatePackages(newArr);
  };

  const addNewPackage = (packageName: string) => {
    const newArr = [...data, packageName] as string[];
    setData([...data, packageName]);
    updatePackages(newArr);
  };

  const comparePackages = (
    requestedPackage: string | CondaSpecificationPip,
    newPackage: string,
    newPackageName: string | CondaSpecificationPip
  ) => {
    const { name } = requestedPackageParser(requestedPackage as string);

    if (name === newPackageName) {
      return newPackage;
    }

    return requestedPackage;
  };

  const updatePackage = (name: string, constraint: string, version: string) => {
    const newPackage = `${name}${constraint === "latest" ? ">=" : constraint}${
      !version ? "" : version
    }`;

    const newArr = data.map(p =>
      comparePackages(p, newPackage, name)
    ) as string[];
    updatePackages(newArr);
  };

  const filteredPackageList = useMemo(
    () => data.filter(item => typeof item !== "object"),
    [data]
  );

  useEffect(() => {
    if (isAdding && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isAdding]);

  useEffect(() => {
    setData(packageList);
  }, [packageList]);

  return (
    <Accordion
      sx={{ width: 576, boxShadow: "none" }}
      defaultExpanded
      disableGutters
    >
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>Requested Packages</StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails
        sx={{
          padding: "23px 21px",
          borderRadius: "0px"
        }}
      >
        <Table aria-label="requested packages">
          <TableHead sx={{ border: "none" }}>
            <TableRow>
              <StyledEditPackagesTableCell
                align="left"
                sx={{
                  width: "120px"
                }}
              >
                <Typography
                  component="p"
                  sx={{ fontSize: "16px", fontWeight: 500 }}
                >
                  Name
                </Typography>
              </StyledEditPackagesTableCell>
              {!isCreating && (
                <StyledEditPackagesTableCell
                  align="left"
                  sx={{
                    width: "180px"
                  }}
                >
                  <Typography
                    component="p"
                    sx={{ fontSize: "16px", fontWeight: 500 }}
                  >
                    Installed Version
                  </Typography>
                </StyledEditPackagesTableCell>
              )}
              <StyledEditPackagesTableCell align="left">
                <Typography
                  component="p"
                  sx={{ fontSize: "16px", fontWeight: 500 }}
                >
                  Version Constraint
                </Typography>
              </StyledEditPackagesTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPackageList.map(requestedPackage => (
              <RequestedPackagesTableRow
                onUpdate={updatePackage}
                onRemove={removePackage}
                key={`${requestedPackage}`}
                requestedPackage={`${requestedPackage}`}
                isCreating={isCreating}
              />
            ))}
          </TableBody>
        </Table>
        <Box ref={scrollRef}>
          {isAdding && (
            <AddRequestedPackage
              onSubmit={addNewPackage}
              onCancel={setIsAdding}
              isCreating={isCreating}
            />
          )}
        </Box>
      </StyledAccordionDetails>
      <AccordionDetails
        sx={{
          border: `1px solid ${palette.primary.main}`,
          borderTop: "0px",
          borderRadius: "0px 0px 5px 5px",
          padding: "15px 21px",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <StyledButtonPrimary
          variant="contained"
          onClick={() => setIsAdding(true)}
        >
          + Add Package
        </StyledButtonPrimary>
      </AccordionDetails>
    </Accordion>
  );
};
