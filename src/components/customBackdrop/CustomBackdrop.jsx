import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { withStyles } from "@mui/styles";

const LimitedBackdrop = withStyles(
  {
    root: {
      // position: 'absolute !important',
      zIndex: "1301 !important",
      color: "#fff",
      background: "transparent",
    },
  },
  { index: 1 }
)(Backdrop);

const CustomBackdrop = (props) => {
  return (
    <>
      <LimitedBackdrop
        open={props.loading}
        style={{ position: props.position || "fixed" }}
      >
        <CircularProgress
          // variant="determinate"
          color="secondary"
          size={80}
          thickness={5}
          value={100}
        />
      </LimitedBackdrop>
      {props.children}
    </>
  );
};

export default CustomBackdrop;
