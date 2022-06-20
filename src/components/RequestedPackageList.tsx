import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

const RequestedPackageList = () => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Accordion sx={{ width: 421, boxShadow: "none" }}>
      <AccordionSummary
        onClick={() => setExpanded((currentState) => !currentState)}
        sx={{
          border: "1px solid #C4C4C4",
          borderRadius: expanded ? "5px 5px 0px 0px" : "5px",
          paddingLeft: "21px",
          paddingRight: "10px",
          height: 50,
          "&.Mui-expanded": {
            minHeight: 50,
            maxHeight: 50,
            ".MuiAccordionSummary-expandIconWrapper": {
              transform: "rotate(90deg)",
            },
          },
        }}
        expandIcon={<ArrowRightRoundedIcon sx={{ width: 51, height: 55 }} />}
      >
        <Typography
          variant="h5"
          component="h5"
          sx={{ fontSize: "18px", fontWeight: 500 }}
        >
          Requested Packages
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          border: "1px solid  #C4C4C4",
          borderTop: "none",
          borderRadius: "0px 0px 5px 5px",
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore at saepe
        placeat inventore incidunt, nobis eaque similique rerum cumque corrupti
        ut mollitia sunt non nisi vero officiis doloremque accusamus alias?
      </AccordionDetails>
    </Accordion>
  );
};

export default RequestedPackageList;
