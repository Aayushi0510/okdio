import * as React from "react";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { withStyles } from "@mui/styles";

const Accordion = withStyles(
  {
    root: {
      border: "none",
      boxShadow: "none",
      borderRadius: "none",
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&:before": {
        display: "none",
      },
    },
    expanded: {},
  },
  { index: 1 }
)(MuiAccordion);

const AccordionSummary = withStyles(
  {
    root: {
      backgroundColor: "#E8E8E8",
      marginBottom: -1,
      color: "#CFA144",
      borderRadius: "0",
      minHeight: 50,
      "&$expanded": {
        minHeight: 50,
      },
    },
    content: {
      "&$expanded": {
        margin: "0",
      },
    },
    expanded: {},
  },
  { index: 1 }
)(MuiAccordionSummary);

const CustomAccordion = (props) => {
  const {
    title,
    children,
    id = "panel1a-header",
    expanded,
    onChange,
    disabled = false,
    summarySx = {},
  } = props;
  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={onChange}
        disableGutters={true}
        disabled={disabled}
        // sx={{
        //     '.MuiAccordion-root': {
        //         '&.Mui-expanded': {
        //             margin: '0px'
        //         },
        //         '.MuiButtonBase-root': {
        //             backgroundColor: '#E8E8E8'
        //         },
        //         '.MuiAccordionSummary-content': {
        //             margin: '0px'
        //         }
        //     }
        // }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon fontSize="large" color="primary" />}
          aria-controls="panel1a-content"
          id={id}
          sx={summarySx}
        >
          <Typography
            sx={{
              color: "primary.main",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "50px",
            }}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </>
  );
};
export default CustomAccordion;
