import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, CircularProgress } from "@mui/material";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
      top: "50%",
      zIndex: "1050",
    },
  }),
  { index: 1 }
);

const CustomLoader = ({ size, fallback }) => {
  const classes = useStyles();

  return (
    <>
      <Grid
        className={classes.root}
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ position: fallback ? "absolute" : "relative" }}
      >
        <CircularProgress color="secondary" size="80" />
      </Grid>
    </>
  );
};

export default CustomLoader;
