import AccordionDetails from "@mui/material/AccordionDetails";
import useTheme from "@mui/material/styles/useTheme";
import Accordion from "@mui/material/Accordion";
import React, { useMemo, useState } from "react";
import StyledAccordionDetails from "src/styles/StyledAccordionDetails";
import StyledAccordionExpandIcon from "src/styles/StyledAccordionExpandIcon";
import StyledAccordionSummary from "src/styles/StyledAccordionSummary";
import StyledAccordionTitle from "src/styles/StyledAccordionTitle";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import StyledEditPackagesTableCell from "src/styles/StyledEditPackagesTableCell";
import RequestedPackagesTableRow from "./RequestedPackagesTableRow";
import StyledButtonPrimary from "src/styles/StyledButtonPrimary";
import AddRequestedPackage from "./AddRequestedPackage";

interface IRequestedPackagesEditProps {
  packageList: (string | object)[];
  listHeight: number;
}

const RequestedPackagesEdit = ({
  packageList,
  listHeight,
}: IRequestedPackagesEditProps) => {
  const [data, setData] = useState(packageList);
  const [isAdding, setIsAdding] = useState(false);
  const { palette } = useTheme();

  const removePackage = (packageName: string) => {
    setData((currentData) =>
      currentData.filter((item) => item !== packageName)
    );
  };

  const filteredPackageList = useMemo(
    () => data.filter((item) => typeof item !== "object"),
    [data]
  );

  return (
    <Accordion sx={{ width: 576, boxShadow: "none" }}>
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>Requested Packages</StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails
        sx={{
          maxHeight: `${listHeight}px`,
          padding: "23px 21px",
          borderRadius: "0px",
        }}
      >
        <Table aria-label="requested packages">
          <TableHead sx={{ border: "none" }}>
            <TableRow>
              <StyledEditPackagesTableCell
                align="left"
                sx={{
                  width: "120px",
                }}
              >
                <Typography
                  component="p"
                  sx={{ fontSize: "16px", fontWeight: 500 }}
                >
                  Name
                </Typography>
              </StyledEditPackagesTableCell>
              <StyledEditPackagesTableCell align="left">
                <Typography
                  component="p"
                  sx={{ fontSize: "16px", fontWeight: 500 }}
                >
                  Installed Version
                </Typography>
              </StyledEditPackagesTableCell>
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
            {filteredPackageList.map((requestedPackage) => (
              <RequestedPackagesTableRow
                onRemove={removePackage}
                key={`${requestedPackage}`}
                requestedPackage={`${requestedPackage}`}
              />
            ))}
            {isAdding && <AddRequestedPackage onCancel={setIsAdding} />}
          </TableBody>
        </Table>
      </StyledAccordionDetails>
      <AccordionDetails
        sx={{
          border: `1px solid ${palette.primary.main}`,
          borderTop: "0px",
          borderRadius: "0px 0px 5px 5px",
          padding: "15px 21px",
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

export default RequestedPackagesEdit;
